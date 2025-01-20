// File: pages/CustomerPage/CustomerPage.js
import React, { useState } from "react";
import CustomerTableComponent from "./partials/CustomerTableComponent";
import SearchComponent from "../../components/SearchComponent";
import { ToastContainer } from "react-toastify";

export default function CustomerPage() {
  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái lưu query tìm kiếm

  // Hàm xử lý tìm kiếm từ SearchComponent
  const handleSearch = (query) => {
    setSearchQuery(query); // Cập nhật searchQuery
  };

  return (
    <div>
      <h1 className="text-2xl font-bold   text-gray-700 mb-2">KHÁCH HÀNG</h1>
      <div className="flex items-center justify-between mb-2">
        {/* Hiển thị SearchComponent để người dùng tìm kiếm */}
        <SearchComponent onSearch={handleSearch} />
      </div>

      {/* Truyền searchQuery vào CustomerTableComponent */}
      <CustomerTableComponent searchQuery={searchQuery} />
      <ToastContainer autoClose={2000} />
    </div>
  );
}
