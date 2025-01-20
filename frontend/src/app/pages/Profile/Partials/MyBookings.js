import React from "react";

const MyBookings = () => {
  // Dữ liệu mẫu về các đơn đặt tour
  const bookings = [
    {
      bookingCode: "123ABC",
      bookingDate: "2024-12-10",
      expirationDate: "2024-12-20",
      totalSeats: 2,
      totalAmount: 300000,
      status: "Đã xác nhận",
    },
    {
      bookingCode: "456DEF",
      bookingDate: "2024-12-11",
      expirationDate: "2024-12-21",
      totalSeats: 1,
      totalAmount: 150000,
      status: "Chờ xác nhận",
    },
    {
      bookingCode: "789GHI",
      bookingDate: "2024-12-12",
      expirationDate: "2024-12-22",
      totalSeats: 4,
      totalAmount: 600000,
      status: "Đã hủy",
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">
        Danh Sách Đặt Tour
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold border-b border-gray-200">
                Mã Đặt Chỗ
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold border-b border-gray-200">
                Ngày Đặt
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold border-b border-gray-200">
                Ngày Hết Hạn
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold border-b border-gray-200">
                Tổng Số Chỗ
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold border-b border-gray-200">
                Tổng Tiền
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold border-b border-gray-200">
                Trạng Thái
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="px-6 py-4 text-gray-800">
                  {booking.bookingCode}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {booking.bookingDate}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {booking.expirationDate}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {booking.totalSeats}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {new Intl.NumberFormat().format(booking.totalAmount)} VND
                </td>
                <td className="px-6 py-4 text-gray-800">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      booking.status === "Đã xác nhận"
                        ? "bg-green-100 text-green-600"
                        : booking.status === "Chờ xác nhận"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-red"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
