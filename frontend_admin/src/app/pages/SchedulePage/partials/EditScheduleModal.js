import React, { useState } from "react";
import { useFilterContext } from "../../../context/FilterContext.js";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import {
  notifyError,
  notifySuccess,
} from "../../../components/Notification.js";

export default function ScheduleModal({
  isOpen,
  onClose,
  schedule,
  fetchData,
}) {
  const [selectedTour, setSelectedTour] = useState("");
  const [startDate, setStartDate] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [scheduleCode, setScheduleCode] = useState("");
  // Initialize status with the value of schedule.status
  const [status, setStatus] = useState(schedule.status || ""); // Default to an empty string if schedule.status is not available
  const statuses = [
    { id: 1, name: "ĐANG BÁN" },
    { id: 2, name: "CHỜ DIỄN RA" },
    { id: 3, name: "ĐANG DIỄN RA" },
    { id: 4, name: "ĐÃ KẾT THÚC" },
  ];
  // Kiểm tra nếu modal không mở
  if (!isOpen) return null;

  const handleFormSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/schedules", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sta: status,
          id: schedule._id,
        }),
      });

      console.log(status, schedule._id);
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Cập nhật chuyến đi thành công",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          fetchData();
          // Reset states and close modal
          setSelectedTour("");
          setStartDate("");
          setGuestCount(1);
          setScheduleCode("");
          setStatus("");
          onClose();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Cập nhật chuyến đi thất bại",
          text: "Vui lòng thử lại sau!",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      console.error("Error submitting tour:", error);
      Swal.fire({
        icon: "error",
        title: "Cập nhật chuyến đi thất bại",
        text: "Vui lòng thử lại sau!",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center pt-8 place-items-start z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/2 p-6 flex flex-col max-h-[70vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b mb-4">
          <h1 className="text-2xl font-semibold"> CHUYẾN ĐI</h1>
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
              className="size-6"
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
          <div className="    border border-gray-300 rounded-lg p-2 bg-slate-50  gap-4">
            {/* Tour Info */}
            <div className="mb-4">
              {/* Chọn tour ở hàng riêng biệt */}
              <div className="mb-4">
                <h4 className="font-semibold  text-blue-500">Tour:</h4>
                <input
                  type="text"
                  className="mt-2 w-full p-2 border rounded"
                  value={schedule.tour_name}
                  placeholder="Tour"
                  disabled
                />
              </div>

              {/* Mã chuyến đi, Ngày khởi hành, Số khách và Tình trạng */}
              <div className="grid grid-cols-2 gap-4">
                {/* Schedule Code */}
                <div>
                  <h4 className="font-semibold  text-blue-500">
                    Mã chuyến đi:
                  </h4>
                  <input
                    type="text"
                    className="mt-2 w-full p-2 border rounded"
                    value={schedule.schedule_code}
                    placeholder="Nhập mã chuyến đi"
                    disabled
                  />
                </div>

                {/* Start Date */}
                <div>
                  <h4 className="font-semibold  text-blue-500">
                    Ngày khởi hành:
                  </h4>
                  <input
                    type="date"
                    className="mt-2 w-full p-2 border rounded"
                    value={schedule.departure_date}
                    disabled
                  />
                </div>

                {/* Guest Count */}
                <div>
                  <h4 className="font-semibold  text-blue-500">
                    {" "}
                    Tổng số chỗ:
                  </h4>
                  <input
                    type="number"
                    className="mt-2 w-full p-2 border rounded"
                    value={schedule.capacity}
                    min={0}
                    placeholder="Nhập số lượng khách"
                    disabled
                  />
                </div>

                {/* Status */}
                <div>
                  <h4 className="font-semibold  text-blue-500">Tình trạng:</h4>
                  <select
                    className="mt-2 w-full p-2 border rounded"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
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
          </div>

          {/* Booking Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-500 text-white rounded-md"
            >
              Thoát
            </button>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleFormSubmit}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
