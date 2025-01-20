import React from "react";

function SearchBar() {
  return (
    <div>
      <input
        type="text"
        placeholder="Bạn tìm gì hôm nay?"
        className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-main"
      />
    </div>
  );
}

export default SearchBar;
