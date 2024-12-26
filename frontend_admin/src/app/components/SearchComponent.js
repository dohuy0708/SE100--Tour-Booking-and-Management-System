import React, { useState } from "react";

export default function SearchComponent({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery); // Gửi giá trị tìm kiếm lên component cha khi nhấn nút
  };

  return (
    <div className="relative my-4 w-96">
      <button
        onClick={handleSearchClick}
        className="absolute left-0 top-1/2 -translate-y-1/2 pl-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Tìm kiếm..."
        className="block w-full rounded-lg border-gray-300 py-1.5 pl-8  pr-2 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2   focus:ring-gray-500  "
      />
    </div>
  );
}
