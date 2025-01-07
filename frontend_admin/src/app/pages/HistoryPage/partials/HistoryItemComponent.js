import React, { useState } from "react";
import HistoryModal from "./HistoryModal";
import image from "../../../../mocks/img/Vinpearl-amusement-park_245977546.jpg";
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
            src={`http://localhost:8080${schedule?.tour_image}`}
            alt={"Tour Image"}
            className="object-cover w-full h-full rounded-md"
          />
        </div>

        {/* Tour Info */}
        <div className="flex flex-1">
          {/* Thông tin tour */}
          <div className="flex-1">
            <p className="font-medium text-red-500">
              Mã chuyến đi: {schedule.schedule_code}
            </p>
            <p className="font-medium text-blue-500">{schedule.tour_name}</p>
            <p className="text-sm">Mã tour: {schedule.tour_code}</p>
          </div>

          {/* Ngày khởi hành */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="font-medium">Ngày khởi hành:</p>
            <p className="font-bold text-blue-500">
              {new Date(schedule.departure_date).toLocaleDateString()}
            </p>

            <p className="text-sm text-gray-600">
              Thời gian: {schedule.departure_time}
            </p>
          </div>

          {/* Sức chứa & Chỗ đã đặt */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="font-medium">Sức chứa: {schedule.capacity}</p>
            <p className="font-medium text-yellow-500">
              Chỗ đã đặt:{" "}
              {schedule.capacity && schedule.available_slots !== undefined
                ? schedule.capacity - schedule.available_slots
                : "NaN"}{" "}
            </p>
          </div>
          <div className="flex items-center w-34">
            <button
              onClick={() => handleEdit(schedule)}
              className="px-4 py-2 ml-4 bg-blue-400 text-white rounded-md flex items-center justify-center"
              style={{
                backgroundImage: 'url("/path/to/your-image.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              Phản hồi
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
