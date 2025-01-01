import React, { useState } from "react";
import SearchComponent from "../../components/SearchComponent";
import StaffTableComponent from "./partials/StaffTableComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifySuccess } from "../../components/Notification";
import { Navigate, useNavigate } from "react-router-dom";
export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái lưu query tìm kiếm
  const navigate = useNavigate(); // Khai báo useNavigate
  // Hàm xử lý tìm kiếm từ SearchComponent
  const handleSearch = (query) => {
    setSearchQuery(query); // Cập nhật searchQuery
  };

  const HandleAddStaff = () => {
    navigate("/signup"); // Điều hướng đến /resetpass
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="text-2xl font-bold   text-gray-700 mb-2">NHÂN VIÊN</h1>
      <div className="flex items-center justify-between mb-2">
        {/* Hiển thị SearchComponent để người dùng tìm kiếm */}
        <SearchComponent onSearch={handleSearch} />
        {/* Nút Thêm */}
        <button
          onClick={HandleAddStaff}
          // Open modal
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
          THÊM NHÂN VIÊN
        </button>
      </div>
      <StaffTableComponent searchQuery={searchQuery}></StaffTableComponent>
    </div>
  );
}
