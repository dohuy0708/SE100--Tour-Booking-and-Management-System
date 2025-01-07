import React, { useEffect, useState } from "react";
import { FilterProvider } from "../../context/FilterContext";
import FilterComponent from "../../components/FilterComponent/FilterComponent";
import { getScheduleData } from "../../services/Schedule_w_TourService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ScheduleModal from "../SchedulePage/partials/EditScheduleModal";
import ScheduleItemComponent from "../SchedulePage/partials/ScheduleItemComponent";
import HistoryItemComponent from "./partials/HistoryItemComponent";
import { notifyError } from "../../components/Notification";

export default function HistoryPage() {
  const statuses = [
    { id: 1, name: "ĐANG BÁN" },
    { id: 2, name: "CHỜ DIỄN RA" },
    { id: 3, name: "ĐANG DIỄN RA" },
    { id: 4, name: "ĐÃ KẾT THÚC" },
  ];
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [ScheduleStatuses, setScheduleStatuses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);

  const [loading, setLoading] = useState(true);

  const fetchScheduleData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/schedules/end", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      const fetchedSchedules = await response.json();

      console.log("History item", fetchedSchedules);
      setSchedules(fetchedSchedules);
      setFilteredSchedules(fetchedSchedules);
    } catch (error) {
      notifyError("Lỗi khi lấy dữ liệu từ server!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduleData();
  }, []);
  // Xử lý lọc
  const handleFilterApply = async (filters) => {
    // Áp dụng lọc và phân trang
    try {
      const filteredSchedule = await getScheduleData({
        filters: {}, // Bắt đầu không có bộ lọc
        page: currentPage,
        limit: recordsPerPage,
      });
      setFilteredSchedules(filteredSchedule);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  // Xử lý đặt lại bộ lọc
  const handleReset = () => {
    setFilteredSchedules(schedules);
  };
  // Tính toán số trang dựa trên tổng số booking
  const totalPages = Math.ceil(filteredSchedules.length / recordsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  if (loading) {
    return (
      <div className="p-4 bg-gray-100">
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      </div>
    );
  }
  return (
    <FilterProvider>
      <div className=" bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">TOUR ĐÃ ĐI</h1>

        <div className="flex items-center justify-between mb-4">
          {/* Component Filter */}

          <FilterComponent
            onFilterApply={handleFilterApply}
            onReset={handleReset}
            status={statuses}
          />

          {/* Nút Thêm */}

          {/* <ScheduleModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            statuses={statuses} // Truyền statuses vào modal
          ></ScheduleModal> */}
        </div>

        {/* Danh sách lịch trình */}
        <div className="mt-4 grid grid-cols-1 gap-4">
          {filteredSchedules.length > 0 ? (
            filteredSchedules
              .slice(
                (currentPage - 1) * recordsPerPage,
                currentPage * recordsPerPage
              )
              .map((schedule) => (
                <HistoryItemComponent key={schedule.id} schedule={schedule} />
              ))
          ) : (
            <p className="text-center text-gray-500">
              Không có lịch trình phù hợp
            </p>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <nav aria-label="Page navigation">
            <ul className="inline-flex items-center">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-l-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m15 6l-6 6l6 6"
                    />
                  </svg>
                </button>
              </li>
              {/* Hiển thị các nút phân trang */}
              {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 border border-gray-300 ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-r-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m9 6l6 6l-6 6"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </FilterProvider>
  );
}
