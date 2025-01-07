import React, { useEffect, useState } from "react";
import RevenueChart from "../../components/RevenueChart";

const vietnameseMonths = [
  "Tháng 1", // January
  "Tháng 2", // February
  "Tháng 3", // March
  "Tháng 4", // April
  "Tháng 5", // May
  "Tháng 6", // June
  "Tháng 7", // July
  "Tháng 8", // August
  "Tháng 9", // September
  "Tháng 10", // October
  "Tháng 11", // November
  "Tháng 12", // December
];

export default function HomePage() {
  const [customersCount, setCustomersCount] = useState(0);
  const [tripsCount, setTripsCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    // Fetch data from server
    const fetchData = async () => {
      try {
        // Fetch customers
        const customersResponse = await fetch(
          "http://localhost:8080/list_customer",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const customers = await customersResponse.json();
        setCustomersCount(customers.length);

        // Fetch trips
        const tripsResponse = await fetch("http://localhost:8080/schedules", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const trips = await tripsResponse.json();
        setTripsCount(trips.length);

        // Fetch bookings
        const bookingsResponse = await fetch("http://localhost:8080/bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const bookings = await bookingsResponse.json();

        // Calculate total revenue
        const confirmedBookings = bookings.filter(
          (booking) => booking.status === "ĐÃ XÁC NHẬN"
        );
        const totalRevenue = confirmedBookings.reduce(
          (sum, booking) =>
            sum + parseFloat(booking.total_price.$numberDecimal),
          0
        );
        setTotalRevenue(totalRevenue);

        // Calculate monthly revenue
        const revenueByMonth = Array(12).fill(0);
        confirmedBookings.forEach((booking) => {
          const bookingMonth = new Date(booking.booking_date).getMonth();
          revenueByMonth[bookingMonth] += parseFloat(
            booking.total_price.$numberDecimal
          );
        });
        setMonthlyRevenue(revenueByMonth);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 min-h-screen">
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
          <div className="text-green-500 text-sm mt-1">▲ 8.5% năm trước</div>
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
          <div className="text-green-500 text-sm mt-1">▲ 1.3% năm trước</div>
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
          <div className="text-red-500 text-sm mt-1">▼ 4.3% năm trước</div>
        </div>
      </div>

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              THỐNG KÊ DOANH THU
            </h2>
            <select>
              {vietnameseMonths.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <RevenueChart data={monthlyRevenue} />
          </div>
        </div>
      </div>
    </div>
  );
}
