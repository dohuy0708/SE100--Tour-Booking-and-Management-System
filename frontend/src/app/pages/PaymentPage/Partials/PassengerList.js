import React, { useState } from "react";
import PassengerInfo from "./PassengerInfo"; // Import component đã có

const PassengerList = () => {
  const [passengers, setPassengers] = useState({
    adult: 1,
    child: 0,
    toddler: 0,
    infant: 0,
  });

  const passengerTypes = {
    adult: { label: "Người lớn", description: "Từ 12 trở lên" },
    child: { label: "Trẻ em", description: "Từ 5 - 11 tuổi" },
    toddler: { label: "Trẻ nhỏ", description: "Từ 2 - 4 tuổi" },
    infant: { label: "Em bé", description: "Dưới 2 tuổi" },
  };

  const [passengerDetails, setPassengerDetails] = useState({
    adult: [{ name: "", gender: "Nam", dob: "" }],
    child: [],
    toddler: [],
    infant: [],
  });

  // Tăng số lượng hành khách
  const handleIncrement = (type) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));

    setPassengerDetails((prev) => ({
      ...prev,
      [type]: [...prev[type], { name: "", gender: "Nam", dob: "" }],
    }));
  };

  // Giảm số lượng hành khách
  const handleDecrement = (type) => {
    if (passengers[type] > 0) {
      setPassengers((prev) => ({
        ...prev,
        [type]: prev[type] - 1,
      }));

      setPassengerDetails((prev) => ({
        ...prev,
        [type]: prev[type].slice(0, -1), // Xóa phần tử cuối cùng
      }));
    }
  };

  // Cập nhật thông tin hành khách
  const handleDetailChange = (type, index, field, value) => {
    const updatedDetails = [...passengerDetails[type]];
    updatedDetails[index][field] = value;

    setPassengerDetails((prev) => ({
      ...prev,
      [type]: updatedDetails,
    }));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-2">
        {Object.keys(passengerTypes).map((key) => (
          <div
            key={key}
            className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
          >
            {/* Loại hành khách */}
            <div>
              <h3 className="font-semibold text-lg">
                {passengerTypes[key].label}
              </h3>
              <p className="text-sm text-gray-500">
                {passengerTypes[key].description}
              </p>
            </div>

            {/* Nút điều chỉnh số lượng */}
            <div className="flex items-center space-x-4">
              <button
                className={`w-8 h-8 rounded-full ${
                  passengers[key] > 0
                    ? "bg-gray-300 hover:bg-gray-400"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                } flex items-center justify-center`}
                onClick={() => handleDecrement(key)}
                disabled={passengers[key] === 0}
              >
                -
              </button>
              <span className="text-lg font-medium">{passengers[key]}</span>
              <button
                className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center"
                onClick={() => handleIncrement(key)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Danh sách thông tin hành khách */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Thông tin hành khách</h3>
        {Object.keys(passengerTypes).map((type) =>
          passengerDetails[type].map((detail, index) => (
            <PassengerInfo
              key={`${type}-${index}`}
              typeLabel={passengerTypes[type].label}
              index={index}
              detail={detail}
              onChange={(field, value) =>
                handleDetailChange(type, index, field, value)
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PassengerList;
