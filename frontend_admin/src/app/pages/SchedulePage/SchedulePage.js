import React, { useEffect, useState } from "react";
import FilterComponent from "../../components/FilterComponent/FilterComponent.js";
import ScheduleItemComponent from "./partials/ScheduleItemComponent.js";
import { getScheduleData } from "../../services/Schedule_w_TourService.js";

import { FilterProvider } from "../../context/FilterContext.js";
import ScheduleModal from "./partials/ScheduleModal.js";
import { getScheduleStatus } from "./services/getScheduleStatus.js";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError } from "../../components/Notification.js";

export default function SchedulePage() {
  const statuses = [
    { id: 1, name: "ĐANG BÁN" },
    { id: 2, name: "CHỜ DIỄN RA" },
    { id: 3, name: "ĐANG DIỄN RA" },
    { id: 4, name: "ĐÃ KẾT THÚC" },
  ];
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(7);

  const [loading, setLoading] = useState(true);

  const fetchScheduleData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/schedules", {
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

      // Map thứ tự ưu tiên
      const priority = {
        "ĐANG BÁN": 1,
        "CHỜ DIỄN RA": 2,
        "ĐÃ DIỄN RA": 3,
        "ĐÃ KẾT THÚC": 4,
      };

      // Sắp xếp schedules dựa trên thứ tự ưu tiên
      const sortedSchedules = fetchedSchedules.sort((a, b) => {
        return priority[a.status] - priority[b.status];
      });
      console.log("Schedule List ", fetchedSchedules);
      setSchedules(sortedSchedules);
      setFilteredSchedules(sortedSchedules); // Nếu danh sách lọc cần sắp xếp
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
    console.log("filter:", filters);

    let filteredList = schedules;

    // Lọc theo trạng thái
    if (filters.status !== "") {
      filteredList = filteredList.filter((schedule) => {
        return schedule?.status === filters.status;
      });
    }

    // Lọc theo ngày
    if (filters.date !== "") {
      filteredList = filteredList.filter((schedule) => {
        // So sánh ngày, cần đảm bảo cả hai đều có cùng định dạng
        const bookingDate = new Date(schedule?.departure_date)
          .toISOString()
          .split("T")[0]; // Chỉ lấy phần ngày (YYYY-MM-DD)
        const filterDate = new Date(filters.date).toISOString().split("T")[0]; // Định dạng ngày của bộ lọc
        return bookingDate === filterDate;
      });
    }

    // Lọc theo location
    if (filters.location !== "") {
      filteredList = filteredList.filter((schedule) => {
        return schedule.locations.some(
          (loc) => loc.location_name === filters.location
        );
      });
    }
    setFilteredSchedules(filteredList);
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
      <div className="flex justify-center items-center h-mincontent py-6">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
        <span className="ml-4 text-lg text-gray-700">Đang tải...</span>
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
            status={statuses}
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
            statuses={statuses} // Truyền statuses vào modal
            refreshData={fetchScheduleData}
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
                <ScheduleItemComponent
                  key={schedule._id}
                  schedule={schedule}
                  refeshData={fetchScheduleData}
                />
              ))
          ) : (
            <p className="text-center text-gray-500">Không có dữ liệu</p>
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
