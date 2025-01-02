import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { sPayment } from "../paymentStore";
const PassengerInfo = ({ type, price, typeLabel, index, detail, onChange }) => {
  const [errors, setErrors] = useState({});

  // Hàm kiểm tra tính hợp lệ của ngày sinh
  const validateDob = (dob) => {
    if (!dob) return false;
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(dob).getFullYear();
    const age = currentYear - birthYear;

    if (typeLabel === "Người lớn" && age < 12) return false;
    if (typeLabel === "Trẻ em" && (age < 3 || age > 11)) return false;
    if (typeLabel === "Em bé" && age >= 3) return false;

    return true;
  };

  // Hàm kiểm tra lỗi tổng quát
  const validateFields = () => {
    const newErrors = {};

    if (!detail.name) newErrors.name = "Vui lòng nhập họ tên.";
    if (!detail.gender) newErrors.gender = "Vui lòng chọn giới tính.";
    if (!detail.dob || !validateDob(detail.dob)) {
      newErrors.dob = "Ngày sinh không phù hợp với loại hành khách.";
    }

    setErrors(newErrors);
  };

  // Kiểm tra lỗi mỗi khi detail thay đổi
  useEffect(() => {
    validateFields();
  }, [detail]);

  const handleDeletePassenger = (index) => {
    sPayment.set((pre) => {
      pre.value.passengers.splice(index, 1);
    });

    var iN =
      type === "adult"
        ? "adult_price"
        : type === "child"
        ? "children_price"
        : "infant_price";
    sPayment.set((pre) => {
      pre.value.price -= parseFloat(price[iN].$numberDecimal);
    });
  };
  return (
    <div
      className={`border rounded-lg p-4 mb-4 shadow-sm ${
        errors.name ? "border-red" : "border-gray-300"
      }`}
    >
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-gray-700 mb-2">
          {typeLabel} {index + 1}
        </h4>
        <XMarkIcon
          className="h-4 cursor-pointer hover:text-red mb-4"
          onClick={() => handleDeletePassenger(index)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Họ tên */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Họ tên
          </label>
          <input
            type="text"
            value={detail.name}
            onChange={(e) => onChange("name", e.target.value)}
            className={`mt-1 p-2 block w-full rounded-md shadow-sm ${
              errors.name ? "border-red" : "border-gray-300"
            }`}
            placeholder="Nhập họ tên"
          />
          {errors.name && (
            <p className="text-red text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Giới tính */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Giới tính
          </label>
          <select
            value={detail.gender}
            onChange={(e) => onChange("gender", e.target.value)}
            className={`mt-1 p-2 block w-full rounded-md shadow-sm ${
              errors.gender ? "border-red" : "border-gray-300"
            }`}
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
          {errors.gender && (
            <p className="text-red text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        {/* Ngày sinh */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ngày sinh
          </label>
          <input
            type="date"
            value={detail.dob}
            onChange={(e) => onChange("dob", e.target.value)}
            className={`mt-1 p-2 block w-full rounded-md shadow-sm ${
              errors.dob ? "border-red" : "border-gray-300"
            }`}
          />
          {errors.dob && <p className="text-red text-sm mt-1">{errors.dob}</p>}
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;
