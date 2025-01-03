import React, { useEffect, useState } from "react";
import { getMyBookings } from "../services/profileService";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) return; // Nếu không có user_id trong localStorage, không thực hiện lấy dữ liệu

    const fetchBookings = async () => {
      try {
        const response = await getMyBookings(user_id);
        if (response) {
          setBookings(response); // Cập nhật dữ liệu vào state bookings
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bookings: ", error);
      } finally {
        setLoading(false); // Đảm bảo loading sẽ được tắt khi hoàn thành
      }
    };

    fetchBookings();
  }, []); // useEffect sẽ chỉ chạy 1 lần khi component được render lần đầu

  return (
    <div className="container mx-auto p-6 bg-white">
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
            <span className="ml-4 text-lg text-gray-700">Đang tải...</span>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-6 text-lg text-gray-700">
            Hiện tại không có đơn đặt nào.
          </div>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b border-gray-200">
                  Tên tour
                </th>
                <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b border-gray-200">
                  Ngày Đặt
                </th>
                <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b border-gray-200">
                  Tổng Số Chỗ
                </th>
                <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b border-gray-200">
                  Tổng Tiền
                </th>
                <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b border-gray-200">
                  Trạng Thái
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-800">
                    {booking.tour_name}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {new Date(booking.booking_date).toLocaleDateString(
                      "vi-VN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {booking.number_slots}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {parseFloat(
                      booking?.total_price?.$numberDecimal
                    ).toLocaleString()}{" "}
                    VND
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === "ĐÃ XÁC NHẬN"
                          ? "bg-green-100 text-green-600"
                          : booking.status === "CHỜ XÁC NHẬN"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
