import React, { useEffect, useState } from "react";
import FilterComponent from "../../components/FilterComponent/FilterComponent.js";
import ScheduleItemComponent from "./partials/ScheduleItemComponent.js";
import { getScheduleData } from "../../services/Schedule_w_TourService.js";
import { getScheduleStatus } from "../../services/scheduleStatusService.js";
import { FilterProvider } from "../../context/FilterContext.js";
import ScheduleModal from "./partials/ScheduleModal.js";

export default function SchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [ScheduleStatuses, setScheduleStatuses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        setLoading(true);
        const fetchedSchedules = await getScheduleData({
          filters: {}, // Bắt đầu không có bộ lọc
          page: currentPage,
          limit: recordsPerPage,
        });
        const statuses = await getScheduleStatus();
        setSchedules(fetchedSchedules);
        setFilteredSchedules(fetchedSchedules);
        setScheduleStatuses(statuses);

        console.log("Fetched Schedules:", fetchedSchedules);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      } finally {
        setLoading(false);
      }
    };

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
        <h1 className="text-2xl font-bold text-gray-700 mb-4">CHUYẾN ĐI</h1>

        <div className="flex items-center justify-between mb-4">
          {/* Component Filter */}

          <FilterComponent
            onFilterApply={handleFilterApply}
            onReset={handleReset}
            status={ScheduleStatuses}
          />

          {/* Nút Thêm */}
          <button
            onClick={() => setIsModalOpen(true)} // Open modal
            className="ml-4 px-4 py-2 flex bg-blue-500 gap-2 text-white rounded shadow hover:bg-blue-600"
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
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            THÊM MỚI
          </button>

          <ScheduleModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            statuses={ScheduleStatuses} // Truyền statuses vào modal
          ></ScheduleModal>
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
                <ScheduleItemComponent key={schedule.id} schedule={schedule} />
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
