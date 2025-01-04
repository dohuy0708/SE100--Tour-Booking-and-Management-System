import { useState, useEffect } from "react";
import { useFilterContext } from "../../context/FilterContext.js";

export default function FilterComponent({ onFilterApply, onReset, status }) {
  const { locations } = useFilterContext(); // Lấy dữ liệu từ context
  const [filters, setFilters] = useState({
    date: "",
    location: "",
    status: "", // Trạng thái sẽ được lấy từ props
  });
  // Kiểm tra dữ liệu locations và status

  // Khi status props thay đổi, cập nhật lại state filters.status
  useEffect(() => {
    if (status && status.length > 0) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        status: status[0].id || "", // Set mặc định nếu cần
      }));
    }
  }, [status]); // Chạy lại mỗi khi status thay đổi

  // Khi locations context thay đổi, cập nhật lại state filters.location
  useEffect(() => {
    if (locations && locations.length > 0) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        location: locations[0].id || "", // Set mặc định nếu cần
      }));
    }
  }, [locations]); // Chạy lại mỗi khi locations thay đổi

  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleApply = () => {
    onFilterApply(filters); // Truyền filters khi áp dụng bộ lọc
  };

  const handleReset = () => {
    const resetFilters = { date: "", location: "", status: "" };
    setFilters(resetFilters);
    onReset(resetFilters); // Reset bộ lọc và truyền dữ liệu reset
  };

  return (
    <div className="p-2 px-3 bg-white shadow rounded-xl flex flex-wrap gap-4 items-center w-fit">
      {/* Ngày */}
      <div className="flex flex-row items-center space-x-2">
        <label className="text-sm font-semibold">Ngày</label>
        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleChange("date", e.target.value)}
          className="border p-2 rounded text-sm"
        />
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

      {/* Tình trạng */}
      <div className="flex flex-row items-center space-x-2">
        <label className="text-sm font-semibold">Tình trạng</label>
        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="border p-2 rounded text-sm"
        >
          <option value="">Tất cả</option>
          {status.map((stat) => (
            <option key={stat.id} value={stat.id}>
              {stat.name}
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
