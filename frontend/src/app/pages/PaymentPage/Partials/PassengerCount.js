import React, { useState } from "react";

const PassengerCount = () => {
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    babies: 0,
  });

  const updatePassengerCount = (type, action) => {
    setPassengers((prev) => ({
      ...prev,
      [type]:
        action === "increment"
          ? prev[type] + 1
          : prev[type] > 0
          ? prev[type] - 1
          : 0,
    }));
  };

  return (
    <div className="grid grid-cols-4 gap-4 items-center">
      {["Người lớn", "Trẻ em", "Trẻ nhỏ", "Em bé"].map((type, index) => {
        const keys = ["adults", "children", "infants", "babies"];
        const key = keys[index];
        return (
          <div key={key}>
            <label className="block font-semibold mb-2">{type}:</label>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded-lg"
                onClick={() => updatePassengerCount(key, "decrement")}
              >
                -
              </button>
              <span>{passengers[key]}</span>
              <button
                className="px-3 py-1 border rounded-lg"
                onClick={() => updatePassengerCount(key, "increment")}
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PassengerCount;
