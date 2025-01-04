import React, { useEffect, useState } from "react";
import { useFilterContext } from "../../../context/FilterContext";

export default function TourFilterComponent({ onFilterApply, onReset }) {
  const { locations } = useFilterContext(); // Lấy dữ liệu từ context

  const [filters, setFilters] = useState({
    tourType: "",
    location: "",
    priceRange: "",
  });

  const tourTypes = [
    { id: "domestic", name: "TRONG NƯỚC" },
    { id: "international", name: "NƯỚC NGOÀI" },
  ];

  // const locations = [
  //   { id: "hanoi", locationName: "Hà Nội" },
  //   { id: "danang", locationName: "Đà Nẵng" },
  //   { id: "hochiminh", locationName: "Hồ Chí Minh" },
  //   { id: "dalat", locationName: "Đà Lạt" },
  //   { id: "halong", locationName: "Hạ Long" },
  // ];

  const priceRanges = [
    { id: "under5m", name: "Dưới 5 triệu" },
    { id: "5to10m", name: "5 - 10 triệu" },
    { id: "10to20m", name: "10 - 20 triệu" },
    { id: "above20m", name: "Trên 20 triệu" },
  ];
  useEffect(() => {
    if (locations && locations.length > 0) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        location: locations[0].id || "", // Set mặc định nếu cần
      }));
    }
  }, [locations]); // Chạy lại mỗi khi locations thay đổi

  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleApply = () => {
    onFilterApply(filters);
  };

  const handleReset = () => {
    setFilters({ tourType: "", location: "", priceRange: "" });
    onReset();
  };

  return (
    <div className="p-2 px-3 bg-white shadow rounded-xl flex flex-wrap gap-4 items-center w-fit">
      {/* Loại tour */}
      <div className="flex flex-row items-center space-x-2">
        <label className="text-sm font-semibold">Loại Tour</label>
        <select
          value={filters.tourType}
          onChange={(e) => handleChange("tourType", e.target.value)}
          className="border p-2 rounded text-sm"
        >
          <option value="">Tất cả</option>
          {tourTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {/* Địa điểm */}
      <div className="flex flex-row items-center space-x-2">
        <label className="text-sm font-semibold">Địa điểm</label>
        <select
          value={filters.location}
          onChange={(e) => handleChange("location", e.target.value)}
          className="border p-2 rounded text-sm"
        >
          <option value="">Tất cả</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.location_name}
            </option>
          ))}
        </select>
      </div>

      {/* Giá */}
      <div className="flex flex-row items-center space-x-2">
        <label className="text-sm font-semibold">Giá</label>
        <select
          value={filters.priceRange}
          onChange={(e) => handleChange("priceRange", e.target.value)}
          className="border p-2 rounded text-sm"
        >
          <option value="">Tất cả</option>
          {priceRanges.map((range) => (
            <option key={range.id} value={range.id}>
              {range.name}
            </option>
          ))}
        </select>
      </div>

      {/* Nút Filter */}
      <button
        onClick={handleApply}
        className="bg-blue-500 text-white text-sm px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
      >
        <span>Lọc</span>
      </button>

      {/* Nút Reset */}
      <button
        onClick={handleReset}
        className="bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-400"
      >
        <span>Đặt lại</span>
      </button>
    </div>
  );
}
