import React, { useEffect, useState } from "react";
import RevenueChart from "../../components/RevenueChart";

const vietnameseMonths = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [customersCount, setCustomersCount] = useState(0);
  const [customersPercentage, setCustomersPercentage] = useState(0);
  const [tripsCount, setTripsCount] = useState(0);
  const [tripsPercentage, setTripsPercentage] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenuePercentage, setRevenuePercentage] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const years = [
    new Date().getFullYear(),
    new Date().getFullYear() - 1,
    new Date().getFullYear() - 2,
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const bookingsResponse = await fetch("http://localhost:8080/bookings", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const bookings = await bookingsResponse.json();

        const filteredBookings = bookings.filter(
          (booking) =>
            new Date(booking.booking_date).getFullYear() === selectedYear
        );

        const lastYearBookings = bookings.filter(
          (booking) =>
            new Date(booking.booking_date).getFullYear() === selectedYear - 1
        );

        const confirmedBookings = filteredBookings.filter(
          (booking) => booking.status === "ĐÃ XÁC NHẬN"
        );
        const lastYearConfirmed = lastYearBookings.filter(
          (booking) => booking.status === "ĐÃ XÁC NHẬN"
        );

        const totalRevenue = confirmedBookings.reduce(
          (sum, booking) =>
            sum + parseFloat(booking.total_price.$numberDecimal),
          0
        );
        const lastYearRevenue = lastYearConfirmed.reduce(
          (sum, booking) =>
            sum + parseFloat(booking.total_price.$numberDecimal),
          0
        );
        setTotalRevenue(totalRevenue);
        setRevenuePercentage(
          lastYearRevenue
            ? ((totalRevenue - lastYearRevenue) / lastYearRevenue) * 100
            : 0
        );

        const totalPassengers = confirmedBookings.reduce(
          (sum, booking) => sum + booking.passengers.length,
          0
        );
        const lastYearPassengers = lastYearConfirmed.reduce(
          (sum, booking) => sum + booking.passengers.length,
          0
        );
        setCustomersCount(totalPassengers);
        setCustomersPercentage(
          lastYearPassengers
            ? ((totalPassengers - lastYearPassengers) / lastYearPassengers) *
                100
            : 0
        );

        const uniqueSchedules = [
          ...new Set(confirmedBookings.map((b) => b.schedule_id)),
        ].length;
        const lastYearUniqueSchedules = [
          ...new Set(lastYearConfirmed.map((b) => b.schedule_id)),
        ].length;
        setTripsCount(uniqueSchedules);
        setTripsPercentage(
          lastYearUniqueSchedules
            ? ((uniqueSchedules - lastYearUniqueSchedules) /
                lastYearUniqueSchedules) *
                100
            : 0
        );

        const revenueByMonth = Array(12).fill(0);
        confirmedBookings.forEach((booking) => {
          const month = new Date(booking.booking_date).getMonth();
          revenueByMonth[month] += parseFloat(
            booking.total_price.$numberDecimal
          );
        });
        setMonthlyRevenue(revenueByMonth);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-mincontent py-6">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
        <span className="ml-4 text-lg text-gray-700">Đang tải...</span>
      </div>
    );
  }
  return (
    <div className="p-2 min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold   text-gray-700 mb-2">TRANG CHỦ</h1>
        <select
          className="p-2 border rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-purple-500 text-3xl font-bold">
              {customersCount}
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a9 9 0 10-18 0v2h5m-5-6h18m-9 3v3m0 0l-3-3m3 3l3-3"
                />
              </svg>
            </div>
          </div>
          <div className="text-gray-500 mt-2">Tổng khách hàng</div>
          <div
            className={`text-sm mt-1 ${
              customersPercentage >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {customersPercentage >= 0 ? "▲" : "▼"}{" "}
            {Math.abs(customersPercentage).toFixed(2)}% năm trước
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-yellow-500 text-3xl font-bold">
              {tripsCount}
            </div>
            <div className="bg-yellow-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c1.046 0 2 .954 2 2 0 1.046-.954 2-2 2s-2-.954-2-2c0-1.046.954-2 2-2zM12 16c1.046 0 2 .954 2 2 0 1.046-.954 2-2 2s-2-.954-2-2c0-1.046.954-2 2-2z"
                />
              </svg>
            </div>
          </div>
          <div className="text-gray-500 mt-2">Tổng chuyến đi</div>
          <div
            className={`text-sm mt-1 ${
              tripsPercentage >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {tripsPercentage >= 0 ? "▲" : "▼"}{" "}
            {Math.abs(tripsPercentage).toFixed(2)}% năm trước
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-green-500 text-3xl font-bold">
              {totalRevenue.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c1.046 0 2 .954 2 2 0 1.046-.954 2-2 2s-2-.954-2-2c0-1.046.954-2 2-2zM12 16c1.046 0 2 .954 2 2 0 1.046-.954 2-2 2s-2-.954-2-2c0-1.046.954-2 2-2z"
                />
              </svg>
            </div>
          </div>
          <div className="text-gray-500 mt-2">Tổng doanh thu</div>
          <div
            className={`text-sm mt-1 ${
              revenuePercentage >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {revenuePercentage >= 0 ? "▲" : "▼"}{" "}
            {Math.abs(revenuePercentage).toFixed(2)}% năm trước
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              THỐNG KÊ DOANH THU {selectedYear}
            </h2>
          </div>
          <RevenueChart data={monthlyRevenue} labels={vietnameseMonths} />
        </div>
      </div>
    </div>
  );
}
