import React, { useState } from "react";
import { useFilterContext } from "../../../context/FilterContext.js";

export default function ScheduleModal({
  isOpen,
  onClose,
  statuses,
  initialSchedule,
}) {
  const [selectedTour, setSelectedTour] = useState("");
  const [startDate, setStartDate] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [scheduleCode, setScheduleCode] = useState("");
  const [status, setStatus] = useState("Planned"); // Default status value

  // Kiểm tra nếu modal không mở
  if (!isOpen) return null;

  const handleFormSubmit = () => {
    if (!selectedTour || !startDate || !guestCount || !scheduleCode) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    alert("Đặt tour thành công!");
    console.log({
      scheduleCode,
      selectedTour,
      startDate,
      guestCount,
      status,
    });
    onClose(); // Đóng modal sau khi đặt tour thành công
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center pt-8 place-items-start z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/2 p-6 flex flex-col max-h-[70vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b mb-4">
          <h1 className="text-2xl font-semibold">THÊM CHUYẾN ĐI</h1>
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
                <h4 className="font-semibold  text-blue-500">Chọn tour:</h4>
                <input
                  type="text"
                  className="mt-2 w-full p-2 border rounded"
                  value={scheduleCode}
                  placeholder="Tour"
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
                    value={scheduleCode}
                    onChange={(e) => setScheduleCode(e.target.value)}
                    placeholder="Nhập mã chuyến đi"
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
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
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
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    min={0}
                    placeholder="Nhập số lượng khách"
                  />
                </div>

                {/* Status */}
                <div>
                  <h4 className="font-semibold  text-blue-500">Tình trạng:</h4>
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
              Hủy
            </button>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleFormSubmit}
            >
              Đặt tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
