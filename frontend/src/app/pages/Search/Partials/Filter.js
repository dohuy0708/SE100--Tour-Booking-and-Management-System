import React, { useState } from "react";

const Filter = ({ onApplyFilters }) => {
  // State cho từng loại filter
  const [selectedBudget, setSelectedBudget] = useState([]);
  const [destination, setDestination] = useState("Tất cả");
  const [selectedDate, setSelectedDate] = useState("");
  const [tourType, setTourType] = useState([]);

  // Dữ liệu mẫu
  const budgets = [
    "Dưới 5 triệu",
    "5 - 10 triệu",
    "10 - 20 triệu",
    "Trên 20 triệu",
  ];
  const tourTypes = ["Trong nước", "Nước ngoài"];

  // Hàm toggle chọn nhiều mục
  const handleToggle = (item, state, setState) => {
    if (state.includes(item)) {
      setState(state.filter((i) => i !== item)); // Bỏ chọn nếu đã được chọn
    } else {
      setState([...state, item]); // Thêm vào nếu chưa được chọn
    }
  };

  // Hàm áp dụng bộ lọc
  const applyFilters = () => {
    const filters = {
      budget: selectedBudget,
      destination,
      date: selectedDate,
      tourType,
    };
    onApplyFilters(filters); // Truyền dữ liệu bộ lọc ra ngoài
  };

  return (
    <div className="bg-white p-4 rounded shadow-md space-y-6 w-full">
      {/* Ngân sách */}
      <div>
        <h3 className="font-semibold mb-2">Ngân sách:</h3>
        <div className="grid grid-cols-2 gap-2">
          {budgets.map((budget) => (
            <button
              key={budget}
              onClick={() =>
                handleToggle(budget, selectedBudget, setSelectedBudget)
              }
              className={`px-1 py-2 rounded border ${
                selectedBudget.includes(budget)
                  ? "bg-main text-white"
                  : "bg-gray-100"
              }`}
            >
              {budget}
            </button>
          ))}
        </div>
      </div>

      {/* Điểm khởi hành */}
      {/* <div>
        <h3 className="font-semibold mb-2">Điểm khởi hành:</h3>
        <select
          value={departurePoint}
          onChange={(e) => setDeparturePoint(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="Tất cả">Tất cả</option>
          <option value="Hà Nội">Hà Nội</option>
          <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
          <option value="Đà Nẵng">Đà Nẵng</option>
        </select>
      </div> */}

      {/* Điểm đến */}
      <div>
        <h3 className="font-semibold mb-2">Điểm đến:</h3>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="Tất cả">Tất cả</option>
          <option value="Hàn Quốc">Hàn Quốc</option>
          <option value="Nhật Bản">Nhật Bản</option>
          <option value="Việt Nam">Việt Nam</option>
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

      {/* Dòng tour */}
      <div>
        <h3 className="font-semibold mb-2">Dòng tour:</h3>
        <div className="grid grid-cols-2 gap-2">
          {tourTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleToggle(type, tourType, setTourType)}
              className={`px-1 py-2 rounded border ${
                tourType.includes(type) ? "bg-main text-white" : "bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Phương tiện */}
      {/* <div>
        <h3 className="font-semibold mb-2">Phương tiện:</h3>
        <div className="grid grid-cols-2 gap-2">
          {transportTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleToggle(type, transport, setTransport)}
              className={`px-3 py-2 rounded border ${
                transport.includes(type) ? "bg-main text-white" : "bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div> */}

      {/* Nút áp dụng */}
      <div>
        <button
          onClick={applyFilters}
          className="w-full bg-main text-white py-2 rounded hover:bg-blue-600"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default Filter;
