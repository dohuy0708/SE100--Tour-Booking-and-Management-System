import React from "react";

const PassengerInfo = ({ typeLabel, index, detail, onChange }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm">
      <h4 className="font-semibold text-gray-700 mb-2">
        {typeLabel} {index + 1}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Họ tên
          </label>
          <input
            type="text"
            value={detail.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Nhập họ tên"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Giới tính
          </label>
          <select
            value={detail.gender}
            onChange={(e) => onChange("gender", e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ngày sinh
          </label>
          <input
            type="date"
            value={detail.dob}
            onChange={(e) => onChange("dob", e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;
