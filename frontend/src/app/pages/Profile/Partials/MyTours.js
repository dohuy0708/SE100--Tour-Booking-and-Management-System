import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyTours,
  createFeedback,
  getMyBookings,
  getFeedbacks,
} from "../services/profileService";
import { toast } from "react-toastify";

export default function MyTours() {
  const [tours, setTours] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState("");
  const [selectedTour, setSelectedTour] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) return;

    const fetchBookings = async () => {
      try {
        const response = await getMyBookings(user_id);
        if (response) {
          const endTours = response.filter(
            (tour) => tour.schedule_id.status === "ĐÃ KẾT THÚC"
          );
          setTours(endTours);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bookings: ", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchFeedBack = async () => {
      try {
        const response = await getFeedbacks();
        if (response) {
          const myFeedbacks = response.filter(
            (feedback) => feedback.customer_id === user_id
          );
          setFeedbacks(myFeedbacks);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ feedback", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
    fetchFeedBack();
  }, []);

  const handleViewTour = (scheduleId) => {
    navigate(`/tour/${scheduleId}`);
  };

  const handleOpenFeedback = (tour) => {
    setSelectedTour(tour);
    setFeedbackModal(true);
  };

  const handleSendFeedback = async () => {
    if (!feedbackContent.trim()) {
      toast.warn("Vui lòng nhập nội dung phản hồi.");
      return;
    }

    const feedbackData = {
      customer: localStorage.getItem("user_id"),
      schedule: selectedTour.schedule_id._id,
      content: feedbackContent,
      date: new Date().toISOString(),
    };

    try {
      await createFeedback(feedbackData);
      toast.success("Phản hồi đã được gửi thành công!");
      setFeedbackContent("");
      setFeedbackModal(false);
    } catch (error) {
      console.error("Lỗi khi gửi phản hồi: ", error);
      toast.error("Đã xảy ra lỗi khi gửi phản hồi.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
        Tour đã đi
      </h2>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
            <span className="ml-4 text-lg text-gray-700">Đang tải...</span>
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-6 text-lg text-gray-700">
            Bạn chưa đi chuyến nào.
          </div>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-4 text-left text-gray-800 font-semibold border-b border-gray-200">
                  Tên tour
                </th>
                <th className="px-4 py-4 text-left text-gray-800 font-semibold border-b border-gray-200">
                  Ngày đi
                </th>
                <th className="px-4 py-4 text-left text-gray-800 font-semibold border-b border-gray-200">
                  Mã lịch trình
                </th>
                <th className="px-4 py-4 text-gray-800 font-semibold border-b border-gray-200"></th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-4 text-gray-800">{tour.tour_name}</td>
                  <td className="px-4 py-4 text-gray-800">
                    {tour.schedule_id.departure_time}{" "}
                    {new Date(
                      tour.schedule_id.departure_date
                    ).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4 text-gray-800">
                    {tour.schedule_code}
                  </td>
                  <td className="px-4 py-4 flex gap-2 items-center">
                    <button
                      className="px-4 py-2 bg-main text-white rounded-lg hover:bg-blue-600"
                      onClick={() =>
                        handleViewTour(tour.schedule_id.tour_id._id)
                      }
                    >
                      Xem tour
                    </button>
                    {feedbacks.find(
                      (feedback) =>
                        feedback.schedule_id === tour.schedule_id._id
                    ) ? (
                      <div className="px-2 py-1 flex items-center bg-green-200 text-green-500 rounded-xl ">
                        Đã phản hồi
                      </div>
                    ) : (
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={() => handleOpenFeedback(tour)}
                      >
                        Phản hồi
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal phản hồi */}
      {feedbackModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Phản hồi</h3>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Nhập phản hồi của bạn..."
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                onClick={() => setFeedbackModal(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleSendFeedback}
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
