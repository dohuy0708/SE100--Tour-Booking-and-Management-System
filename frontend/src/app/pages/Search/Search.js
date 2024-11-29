import React from "react";
import Filter from "./Partials/Filter";
import SearchResults from "./Partials/SearchResult";
import SearchBar from "../../components/SearchBar";

export default function Search() {
  const handleFilters = (filters) => {
    console.log("Filters applied:", filters);
    // Gọi API hoặc xử lý dữ liệu tại đây
  };
  return (
    <div className="grid grid-cols-5 w-full">
      {/* Bộ lọc ở bên trái */}
      <div className="col-span-1 m-4 rounded-lg">
        <Filter onApplyFilters={handleFilters} />
      </div>

      {/* Kết quả tìm kiếm ở bên phải */}
      <div className="col-span-4 p-4 ">
        <SearchBar />
        <SearchResults />
      </div>
    </div>
  );
}
