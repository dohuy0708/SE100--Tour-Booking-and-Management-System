import { useEffect } from "react";

export default function HistoryModal({ isOpen, onClose, schedule }) {
  // Dữ liệu phản hồi ảo
  const feedbackData = [
    {
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0901234567",
      content: "Chuyến đi rất tuyệt vời, tôi rất hài lòng!",
    },
    {
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0912345678",
      content: "Hướng dẫn viên rất nhiệt tình và chuyên nghiệp.",
    },
    {
      name: "Lê Văn C",
      email: "levanc@example.com",
      phone: "0923456789",
      content: "Dịch vụ ăn uống và nghỉ ngơi cần được cải thiện.",
    },
  ];

  const fetchScheduleData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/feedbacks/schedule/:schedule_id${schedule._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      const fetchedSchedules = await response.json();
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    fetchScheduleData();
  }, []);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center pt-8 place-items-start z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/5 p-6 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b mb-4">
          <h1 className="text-2xl font-semibold">THÔNG TIN PHẢN HỒI</h1>
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
          {/* Customer Information */}
          <div className="mb-4">
            <h4 className="font-semibold text-xl text-blue-500 mb-2">
              Chuyến đi
            </h4>
            <div className="grid grid-cols-2 gap-4 border border-gray-300 rounded-lg p-4 bg-slate-50">
              <div>
                <p>
                  <strong>Mã chuyến đi: </strong>
                  {schedule.schedule_code}
                </p>
                <p>
                  <strong>Tên chuyến đi: </strong>
                  {schedule.tour_name}
                </p>
              </div>
              <div>
                <p>
                  <strong>Ngày khởi hành: </strong>
                  {schedule.departure_time}
                </p>
                <p>
                  <strong>Số lượng khách: </strong>
                  {schedule.capacity}
                </p>
              </div>
            </div>
          </div>

          {/* Thông tin phản hồi (Nếu có) */}
          <div className="mt-4">
            <h4 className="font-semibold text-xl text-blue-500 mb-2">
              Thông tin phản hồi
            </h4>
            <div className="border border-gray-300 rounded-lg p-4 bg-slate-50">
              {feedbackData.length > 0 ? (
                <div className="space-y-4">
                  {feedbackData.map((feedback, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-lg p-4 bg-slate-50"
                    >
                      <p>
                        <strong>Họ tên: </strong> {feedback.name}
                      </p>
                      <p>
                        <strong>Email: </strong> {feedback.email}
                      </p>
                      <p>
                        <strong>Số điện thoại: </strong> {feedback.phone}
                      </p>
                      <p>
                        <strong>Nội dung phản hồi: </strong> {feedback.content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-gray-300 rounded-lg p-4 bg-slate-50">
                  <p>Chưa có phản hồi.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
