import React, { useState } from "react";
import HistoryModal from "./HistoryModal";

export default function HistoryItemComponent({ schedule }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleEdit = (schedule) => {
    setSelectedSchedule(schedule); // Lưu thông tin lịch trình cần chỉnh sửa
    setIsModalOpen(true); // Mở modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Đóng modal
    setSelectedSchedule(null); // Xóa thông tin lịch trình khi đóng modal
  };

  return (
    <>
      <div className="flex items-center p-4 bg-white rounded-md shadow-md">
        {/* Tour Image */}
        <div className="w-34 h-24 mr-4">
          <img
            src={schedule.tour?.tourImage || "https://via.placeholder.com/150"}
            alt={schedule.tour?.tourName || "Tour Image"}
            className="object-cover w-full h-full rounded-md"
          />
        </div>

        {/* Tour Info */}
        <div className="flex flex-1">
          {/* Thông tin tour */}
          <div className="flex-1">
            <p className="font-bold">Mã chuyến đi: {schedule.scheduleId}</p>
            <p className="font-medium">{schedule.tour?.tourName}</p>
            <p className="text-sm">Mã tour: {schedule.tour?.tourId}</p>
            <p className="text-sm text-gray-600">
              Thời gian: {schedule.tour?.duration} ngày
            </p>
          </div>

          {/* Ngày khởi hành */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="font-medium">Ngày khởi hành:</p>
            <p className="font-bold text-blue-500">{schedule.departureDate}</p>
            <p className="text-sm text-gray-600">{schedule.departureTime}</p>
          </div>

          {/* Sức chứa & Chỗ đã đặt */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="font-medium">Sức chứa: {schedule.capacity}</p>
            <p className="font-medium text-gray-600">
              Chỗ đã đặt: {schedule.booked}
            </p>
          </div>

          {/* Phản hồi*/}
          <div className="mr-4 w-34 flex items-center justify-center">
            <p className="font-medium ">Phản hồi: 0</p>
          </div>

          {/* Button Edit */}
          <div className="flex items-center w-34">
            <button
              onClick={() => handleEdit(schedule)}
              className="px-4 py-2 ml-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <HistoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        schedule={selectedSchedule}
      ></HistoryModal>
    </>
  );
}
