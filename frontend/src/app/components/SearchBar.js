import React from "react";

function SearchBar({ onSearchChange }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Bạn tìm gì hôm nay?"
        className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-main"
        onChange={(e) => onSearchChange(e.target.value)} // Gửi giá trị lên cha
      />
    </div>
  );
}

export default SearchBar;
