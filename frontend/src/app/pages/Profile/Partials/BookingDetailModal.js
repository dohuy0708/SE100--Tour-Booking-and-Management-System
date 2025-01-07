import React, { useState } from "react";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";

const BookingDetailModal = ({ booking }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatCurrency = (value) => {
    return parseFloat(value?.$numberDecimal || 0).toLocaleString() + " VND";
  };

  if (!isOpen) {
    return (
      <EyeIcon
        className="h-6 text-black hover:text-main hover:bg-gray-200 mr-2 rounded-md cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
    );
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-2xl font-bold text-gray-800">
                  Chi tiết đơn đặt tour
                </h2>
                <XMarkIcon
                  className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Tour Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Thông tin tour
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Tên tour:</p>
                      <p className="font-medium">{booking.tour_name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Mã tour:</p>
                      <p className="font-medium">
                        {booking.schedule_id.tour_id.tour_code}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-600">Ngày khởi hành:</p>
                      <p className="font-medium">
                        {" "}
                        {booking.schedule_id.departure_time}{" "}
                        {new Date(booking.schedule_date).toLocaleDateString(
                          "vi-VN"
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Mã lịch trình:</p>
                      <p className="font-medium">{booking.schedule_code}</p>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Chi tiết đặt chỗ
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Số lượng khách:</p>
                      <p className="font-medium">
                        {booking.number_slots} người
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Ngày đặt:</p>
                      <p className="font-medium">
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
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600 inline-block mr-2">
                        Trạng thái:
                      </p>
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
                    </div>
                  </div>
                </div>

                {/* Price Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Danh sách hành khách
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-4 py-2 text-left text-gray-800">
                            Tên hành khách
                          </th>
                          <th className="border border-gray-300 px-4 py-2 text-left text-gray-800">
                            Ngày sinh
                          </th>
                          <th className="border border-gray-300 px-4 py-2 text-left text-gray-800">
                            Loại vé
                          </th>
                          <th className="border border-gray-300 px-4 py-2 text-center text-gray-800">
                            Giá
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {booking.passengers.map((passenger) => (
                          <tr key={passenger._id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">
                              {passenger.passenger_name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {new Date(
                                passenger.passenger_date
                              ).toLocaleDateString()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {passenger.passenger_type === "ADULT"
                                ? "Người lớn"
                                : passenger.passenger_type === "CHILD"
                                ? "Trẻ em"
                                : "Em bé"}
                            </td>
                            <td className="border text-right border-gray-300 px-4 py-2">
                              {" "}
                              {passenger.passenger_type === "ADULT"
                                ? parseFloat(
                                    booking?.adult_price?.$numberDecimal
                                  ).toLocaleString()
                                : passenger.passenger_type === "CHILD"
                                ? parseFloat(
                                    booking?.children_price?.$numberDecimal
                                  ).toLocaleString()
                                : parseFloat(
                                    booking?.infant_price?.$numberDecimal
                                  ).toLocaleString()}{" "}
                              vnđ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-between pt-4 border-t mt-4">
                    <span className="text-gray-800 font-semibold">
                      Tổng cộng:
                    </span>
                    <span className="font-bold text-lg text-main">
                      {formatCurrency(booking.total_price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingDetailModal;
