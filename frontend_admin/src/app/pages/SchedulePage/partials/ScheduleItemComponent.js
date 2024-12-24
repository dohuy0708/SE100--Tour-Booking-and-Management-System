export default function ScheduleItemComponent({ schedule }) {
  const handleEdit = (id) => {
    console.log(`Chỉnh sửa thông tin lịch trình với ID: ${id}`);
    // Logic thêm modal hoặc form chỉnh sửa tại đây
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-md shadow-md">
      {/* Tour Image (placeholder nếu không có ảnh) */}
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

        {/* Tình trạng */}
        <div className="mr-4 w-34 flex items-center justify-center">
          <p
            className={`px-2 py-1 w-24 text-sm font-medium text-center rounded-md ${
              schedule.status === "Open"
                ? "bg-green-100 text-green-600"
                : schedule.status === "Closed"
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {schedule.status}
          </p>
        </div>

        {/* Button Edit */}
        <div className="flex items-center w-34">
          <button
            onClick={() => handleEdit(schedule.scheduleId)}
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
  );
}
