import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import { handleExport } from "./InvoicePrinter";

export default function EditBookingModal({
  isOpen,
  onClose,
  Booking,
  refreshData,
}) {
  const statuses = [
    { id: 1, name: "CHỜ XÁC NHẬN" },
    { id: 2, name: "ĐÃ XÁC NHẬN" },
    { id: 3, name: "ĐÃ HỦY" },
  ];
  const [status, setStatus] = useState(""); // Default to an empty string if schedule.status is not available

  useEffect(() => {
    if (Booking && Booking.status) {
      setStatus(Booking.status); // Cập nhật state 'status' từ 'Booking.status'
    }
  }, []);

  const handleUpdateBooking = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/bookings/${Booking._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Cập nhật đơn đặt thành công",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        }).then((refreshData(), onClose()));
      } else {
        Swal.fire({
          icon: "error",
          title: "Cập nhật đơn đặt thất bại",
          text: "Vui lòng thử lại sau!",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      console.error("Error submitting tour:", error);
      Swal.fire({
        icon: "error",
        title: "Cập nhật đơn đặt thất bại",
        text: "Vui lòng thử lại sau!",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center pt-8 place-items-start z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 p-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b mb-4">
          <h1 className="text-2xl font-semibold">Đặt tour</h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          className="overflow-auto flex-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Tour Info */}
          <div className="mb-4">
            <h4 className="text-xl text-blue-500 font-semibold mb-2">
              Thông tin tour
            </h4>
            <div className="flex border border-gray-300 rounded-lg p-2 bg-slate-50 gap-4">
              {/* Tour Selection */}
              <div className="flex-grow-[6] basis-[60%]">
                <h4 className="font-semibold">Tour:</h4>
                <input
                  className="mt-2 w-full p-2 border rounded"
                  value={Booking.tour_name || " NaN"}
                  disabled
                ></input>
              </div>

              {/* Start Date Selection */}
              <div className="flex-grow-[2] basis-[20%]">
                <h4 className="font-semibold">Ngày đi:</h4>
                <input
                  className="mt-2 w-full p-2 border rounded"
                  value={new Date(Booking.schedule_date).toLocaleDateString(
                    "vi-VN"
                  )}
                  disabled
                ></input>
              </div>

              {/* Ticket Quantity */}
              <div className="flex-grow-[1] basis-[10%]">
                <h4 className="font-semibold">Số lượng vé:</h4>
                <input
                  type="number"
                  className="mt-2 w-full p-2 border rounded"
                  placeholder="Số vé"
                  value={Booking.number_slots}
                  min={1}
                  disabled // Chỉ cho phép thay đổi khi tour đã được chọn
                />
              </div>
            </div>
          </div>
          {/* Customer Information */}
          <div className="mb-4 ">
            <h4 className="font-semibold text-xl text-blue-500 mb-2">
              Thông tin người đặt tour
            </h4>
            <div className="grid grid-cols-2 gap-4   border border-gray-300 rounded-lg p-2 bg-slate-50">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Họ tên</label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded"
                  placeholder="Họ tên"
                  value={Booking.customer.user_name}
                  disabled
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Số điện thoại</label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded"
                  placeholder="Số điện thoại"
                  value={Booking.customer.phone_number}
                  disabled
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="mt-1 p-2 border rounded"
                  placeholder="Email"
                  value={Booking.customer.email}
                  disabled
                />
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Ngày sinh</label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded"
                  value={
                    new Date(Booking.customer.date_of_birth).toLocaleDateString(
                      "vi-VN"
                    ) || "trống"
                  }
                  disabled
                />
              </div>
            </div>
          </div>
          {/* Booking Information */}
          <div className="mb-4">
            <h4 className="font-semibold text-blue-500 text-xl">
              Thông tin đặt khách hàng
            </h4>
            <div className="mb-4  border border-gray-300 rounded-lg p-2 bg-slate-50">
              {Booking.passengers.map((passenger, index) => (
                <div key={index} className="mb-4 ">
                  <h5 className="font-semibold">Khách {index + 1}</h5>
                  <div className="flex space-x-4 w-full border border-gray-300 rounded-lg p-2">
                    {/* Customer Type */}
                    <div className="w-1/4">
                      <label className="font-medium">Loại khách</label>
                      <input
                        className="mt-2 w-full p-2 border rounded"
                        name="type"
                        value={
                          passenger.passenger_type === "ADULT"
                            ? "Người lớn"
                            : passenger.passenger_type === "CHILD"
                            ? "Trẻ em"
                            : passenger.passenger_type === "INFANT"
                            ? "Em bé"
                            : "Không xác định"
                        }
                        disabled
                      ></input>
                    </div>

                    {/* Full Name */}
                    <div className="w-1/2">
                      <label className="font-medium">Họ tên</label>
                      <input
                        type="text"
                        className="mt-2 w-full p-2 border rounded"
                        placeholder="Họ tên"
                        name="fullName"
                        value={passenger.passenger_name}
                        disabled
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="w-1/4">
                      <label className="font-medium">Ngày sinh</label>
                      <input
                        type="text"
                        className="mt-2 w-full p-2 border rounded"
                        name="dob"
                        value={new Date(
                          passenger.passenger_date
                        ).toLocaleDateString()}
                        disabled
                      />
                    </div>

                    {/* Ticket Price */}
                    <div className="w-1/4">
                      <label className="font-medium">Giá vé</label>
                      <input
                        type="text"
                        className="mt-2 w-full p-2 border rounded text-yellow-500"
                        value={
                          passenger.passenger_type === "ADULT"
                            ? `${parseFloat(
                                Booking.adult_price.$numberDecimal
                              ).toLocaleString()} VND`
                            : passenger.passenger_type === "CHILD"
                            ? `${parseFloat(
                                Booking.children_price.$numberDecimal
                              ).toLocaleString()} VND`
                            : passenger.passenger_type === "INFANT"
                            ? `${parseFloat(
                                Booking.infant_price.$numberDecimal
                              ).toLocaleString()} VND`
                            : "N/A"
                        }
                        disabled
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Order Information */}
          <div className="mb-4">
            <h4 className="text-xl text-blue-500  font-semibold mb-2">
              Thông tin đơn hàng
            </h4>
            <div className="flex  justify-between   border border-gray-300 rounded-lg p-2 bg-slate-50   gap-4">
              <div className="w-fit ml-4">
                <h5 className="font-semibold">Tổng cộng</h5>
                <div className="font-bold text-2xl text-yellow-500">
                  {parseFloat(
                    Booking.total_price.$numberDecimal
                  ).toLocaleString()}{" "}
                  VND
                </div>
              </div>
              {/* Status */}
              <div className="w-fit mr-10">
                <h4 className="font-semibold  ">Tình trạng:</h4>
                <select
                  className="mt-2 w-full p-2 border rounded"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={Booking.status !== "CHỜ XÁC NHẬN"} // Disable khi status là "ĐÃ HỦY"
                >
                  {statuses.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} {/* Dùng thuộc tính 'name' ở đây */}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between w-full">
            {/* Nút Xuất hóa đơn căn lề bên trái */}
            <button
              className={`px-6 py-2 text-white rounded-md ${
                Booking.status === "ĐÃ HỦY" || Booking.status === "CHỜ XÁC NHẬN"
                  ? "bg-gray-300"
                  : "bg-blue-500"
              }`}
              onClick={() => handleExport(Booking)}
              disabled={
                Booking.status === "ĐÃ HỦY" || Booking.status === "CHỜ XÁC NHẬN"
              } // Disable khi status là "ĐÃ HỦY" hoặc "CHỜ XÁC NHẬN"
            >
              Xuất hóa đơn
            </button>

            {/* Các nút còn lại căn lề bên phải */}
            <div className="flex space-x-4 ml-auto">
              <button
                onClick={onClose}
                className={`px-6 py-2 text-white rounded-md bg-red-500`}
                // Disable khi status là "ĐÃ HỦY"
              >
                Thoát
              </button>
              {/* Nút Cập nhật */}
              <button
                className={`px-6 py-2 text-white rounded-md ${
                  Booking.status === "ĐÃ HỦY" ? "bg-gray-300" : "bg-blue-500"
                }`}
                onClick={handleUpdateBooking}
                disabled={Booking.status === "ĐÃ HỦY"} // Disable khi status là "ĐÃ HỦY"
              >
                Cập nhật
              </button>
            </div>
          </div>

          {/* Booking Details */}
        </div>
      </div>
    </div>
  );
}
