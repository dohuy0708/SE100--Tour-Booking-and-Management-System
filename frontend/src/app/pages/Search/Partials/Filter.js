import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { getLocations } from "../services/searchService";

const Filter = ({ onApplyFilters }) => {
  // State cho khoảng giá, điểm đến, ngày đi, và danh sách điểm đến
  const [priceRange, setPriceRange] = useState([0, 10000000]); // Mặc định: 0 - 10 triệu
  const [destination, setDestination] = useState("Tất cả"); // Điểm đến mặc định: "Tất cả"
  const [selectedDate, setSelectedDate] = useState(""); // Ngày đi
  const [locations, setLocations] = useState([]); // Danh sách điểm đến

  // Lấy danh sách điểm đến từ API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await getLocations();
        setLocations(res);
      } catch (error) {
        console.error("Failed to fetch tour details:", error);
      }
    };
    fetchLocations();
  }, []);

  // Hàm xử lý khi thay đổi thanh trượt khoảng giá
  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  // Hàm áp dụng bộ lọc
  const applyFilters = () => {
    const filters = {
      departure_date: selectedDate,
      location_name: destination,
      min_price: priceRange[0],
      max_price: priceRange[1],
    };
    onApplyFilters(filters); // Truyền dữ liệu bộ lọc ra component cha
  };

  // Hàm đặt lại bộ lọc
  const resetFilters = () => {
    setPriceRange([0, 10000000]); // Đặt lại khoảng giá
    setDestination(""); // Đặt lại điểm đến
    setSelectedDate(""); // Đặt lại ngày đi
    const filters = {
      departure_date: selectedDate,
      location_name: destination,
      min_price: priceRange[0],
      max_price: priceRange[1],
    };
    onApplyFilters(filters); // Truyền dữ liệu bộ lọc ra component cha
  };

  return (
    <div className="bg-white p-4 rounded shadow-md space-y-6 w-full">
      {/* Thanh trượt khoảng giá */}
      <div>
        <h3 className="font-semibold mb-2">Khoảng giá (VNĐ):</h3>
        <div className="px-2">
          <Slider
            range
            min={0}
            max={10000000}
            step={100000}
            value={priceRange}
            onChange={handlePriceChange}
            trackStyle={[{ backgroundColor: "#0B5DA7" }]}
            handleStyle={[
              { borderColor: "#0B5DA7" },
              { borderColor: "#0B5DA7" },
            ]}
          />
          <div className="flex justify-between mt-2 text-sm">
            <span>{priceRange[0].toLocaleString()} đ</span>
            <span>{priceRange[1].toLocaleString()} đ</span>
          </div>
        </div>
      </div>

      {/* Điểm đến */}
      <div>
        <h3 className="font-semibold mb-2">Điểm đến:</h3>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="Tất cả">Tất cả</option>
          {locations.map((item) => (
            <option key={item._id} value={item.location_name}>
              {item.location_name}
            </option>
          ))}
        </select>
      </div>

      {/* Ngày đi */}
      <div>
        <h3 className="font-semibold mb-2">Ngày đi:</h3>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Nút áp dụng và đặt lại */}
      <div className="flex gap-2">
        <button
          onClick={applyFilters}
          className="w-full bg-main text-white py-2 rounded hover:bg-blue-600"
        >
          Áp dụng
        </button>
        <button
          onClick={resetFilters}
          className="w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
        >
          Đặt lại
        </button>
      </div>
    </div>
  );
};

export default Filter;
