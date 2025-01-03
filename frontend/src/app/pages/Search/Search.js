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
    location_name: "", // Điểm đến mặc định
    departure_date: "", // Ngày đi mặc định
  });

  const handleSearchChange = (keyword) => {
    setSearchKeyword(keyword);
  };

  const handleFilters = (filters) => {
    if (filters.location_name === "Tất cả") {
      filters.location_name = ""; // Thay đổi giá trị của destination trực tiếp trong filters
    }
    setFilters({ ...filters }); // Cập nhật state filters
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await getTourDetailsBySearch(searchKeyword, filters);
        if (response && response.data) {
          setTours(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch tour details:", error);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [filters, searchKeyword]); // Gọi lại API khi searchKeyword hoặc filters thay đổi

  if (loading)
    return (
      <div className="flex min-h-mincontent justify-center items-center py-6">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
        <span className="ml-4 text-lg text-gray-700">Đang tải...</span>
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
