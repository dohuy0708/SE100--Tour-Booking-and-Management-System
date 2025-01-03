import React, { useEffect, useState } from "react";
import Filter from "./Partials/Filter";
import SearchResults from "./Partials/SearchResult";
import SearchBar from "../../components/SearchBar";
import {
  getTourDetails,
  getTourDetailsBySearch,
} from "./services/searchService";

export default function Search() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState(""); // Từ khóa tìm kiếm
  const [filters, setFilters] = useState({
    min_price: 0,
    max_price: 10000000,
    destination: "Tất cả", // Điểm đến mặc định
    selectedDate: "", // Ngày đi mặc định
  });

  // Hàm xử lý thay đổi từ khóa tìm kiếm
  const handleSearchChange = (keyword) => {
    setSearchKeyword(keyword);
  };

  // Hàm áp dụng bộ lọc
  const handleFilters = (filters) => {
    setFilters(filters);
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await getTourDetailsBySearch(searchKeyword, filters);
        if (response) {
          setTours(response);
        }
      } catch (error) {
        console.error("Failed to fetch tour details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []); // Gọi lại API khi searchKeyword hoặc filters thay đổi

  if (loading)
    return (
      <div className="min-h-mincontent">
        <p>Đang tải...</p>
      </div>
    );
  if (!tours)
    return (
      <div className="min-h-mincontent">
        <p>Không tìm thấy tour!</p>
      </div>
    );

  return (
    <div className="min-h-mincontent">
      <div className="grid grid-cols-5 mx-32">
        {/* Bộ lọc ở bên trái */}
        <div className="col-span-1 mt-4 rounded-lg">
          <Filter onApplyFilters={handleFilters} />
        </div>

        {/* Kết quả tìm kiếm ở bên phải */}
        <div className="col-span-4 p-4 ">
          <SearchBar onSearchChange={handleSearchChange} />
          <SearchResults tours={tours} />
        </div>
      </div>
    </div>
  );
}
