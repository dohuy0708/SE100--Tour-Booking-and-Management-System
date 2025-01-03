import React from "react";
import PassengerInfo from "./PassengerInfo"; // Import component đã có
import { sPayment } from "../paymentStore";

const PassengerList = ({ price }) => {
  // Lấy danh sách hành khách từ Signify store
  const sPassengers = sPayment.slice((n) => n.passengers).use();

  // Định nghĩa loại hành khách
  const passengerTypes = {
    ADULT: { label: "Người lớn", description: "Từ 12 trở lên" },
    CHILDREN: { label: "Trẻ em", description: "Từ 3 - 11 tuổi" },
    INFANT: { label: "Em bé", description: "Dưới 3 tuổi" },
  };

  // Tăng số lượng hành khách
  const handleIncrement = (type) => {
    console.log("giasL: ", price);
    sPayment.set((state) => {
      state.value.passengers.push({ type, name: "", gender: "Nam", date: "" });
    });
    var iN =
      type === "ADULT"
        ? "adult_price"
        : type === "CHILDREN"
        ? "children_price"
        : "infant_price";
    sPayment.set((pre) => {
      pre.value.price += parseFloat(price[iN].$numberDecimal);
    });
  };

  // Giảm số lượng hành khách
  const handleDecrement = (type) => {
    sPayment.set((state) => {
      const index = state.value.passengers.findIndex((p) => p.type === type);
      if (index > -1) state.value.passengers.splice(index, 1);
    });
    var iN =
      type === "ADULT"
        ? "adult_price"
        : type === "CHILDREN"
        ? "children_price"
        : "infant_price";
    sPayment.set((pre) => {
      pre.value.price -= parseFloat(price[iN].$numberDecimal);
    });
  };

  // Cập nhật thông tin hành khách
  const handleDetailChange = (index, field, value) => {
    sPayment.set((state) => {
      state.value.passengers[index][field] = value;
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-2">
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
                  sPassengers.filter((p) => p.type === key).length > 0
                    ? "bg-gray-300 hover:bg-gray-400"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                } flex items-center justify-center`}
                onClick={() => handleDecrement(key)}
                disabled={
                  sPassengers.filter((p) => p.type === key).length === 0
                }
              >
                -
              </button>
              <span className="text-lg font-medium">
                {sPassengers.filter((p) => p.type === key).length}
              </span>
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
        {sPassengers.map((detail, index) => (
          <PassengerInfo
            type={detail.type}
            price={price}
            key={index}
            typeLabel={passengerTypes[detail.type].label}
            index={index}
            detail={detail}
            onChange={(field, value) => handleDetailChange(index, field, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default PassengerList;
