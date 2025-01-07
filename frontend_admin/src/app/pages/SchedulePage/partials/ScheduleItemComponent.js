import React, { useState } from "react";
import EditScheduleModal from "./EditScheduleModal";

export default function ScheduleItemComponent({ schedule, refeshData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(schedule);

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
        <div className="w-32 h-24 mr-4">
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
            <p className="font-medium  text-red-500">
              Mã chuyến đi: {schedule.schedule_code}
            </p>
            <p className="font-medium  text-blue-500">{schedule.tour_name}</p>
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
              Còn trống: {schedule.available_slots}
            </p>
          </div>

          {/* Tình trạng */}
          <div className="mr-4 w-34 flex items-center justify-center">
            <p
              className={`px-2 py-1 w-24 text-sm font-medium text-center rounded-md ${
                schedule.status === "ĐANG BÁN"
                  ? "bg-green-100 text-green-600"
                  : schedule.status === "ĐÃ KẾT THÚC"
                  ? "bg-gray-100 text-gray-600"
                  : schedule.status === "CHỜ DIỄN RA"
                  ? "bg-blue-100 text-blue-600"
                  : schedule.status === "ĐANG DIỄN RA"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {schedule.status}
            </p>
          </div>

          {/* Button Edit */}
          <div className="flex items-center w-34">
            <button
              onClick={() => handleEdit(schedule)}
              className="px-4 py-2 ml-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21 12a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1m-15 .76V17a1 1 0 0 0 1 1h4.24a1 1 0 0 0 .71-.29l6.92-6.93L21.71 8a1 1 0 0 0 0-1.42l-4.24-4.29a1 1 0 0 0-1.42 0l-2.82 2.83l-6.94 6.93a1 1 0 0 0-.29.71m10.76-8.35l2.83 2.83l-1.42 1.42l-2.83-2.83ZM8 13.17l5.93-5.93l2.83 2.83L10.83 16H8Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Schedule Modal */}
      {isModalOpen && (
        <EditScheduleModal
          isOpen={isModalOpen}
          onClose={closeModal}
          schedule={selectedSchedule}
          fetchData={refeshData}
        />
      )}
    </>
  );
}
