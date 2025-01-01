import React, { useState } from "react";

export default function MyProfile({ userData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    user_name: userData?.user_name || "",
    email: userData?.email || "",
    phone_number: userData?.phone_number || "",
    gender: userData?.gender || "Nam",
    date_of_birth: userData?.date_of_birth || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Lưu dữ liệu tại đây
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
        Thông Tin Cá Nhân
      </h2>
      <form className="space-y-6">
        <div className="flex items-center">
          <label className="w-1/4 font-semibold text-gray-600">Họ Tên:</label>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`flex-1 text-gray-800 px-4 py-2 rounded-md border ${
              isEditing ? "bg-gray-100" : "bg-transparent"
            }`}
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/4 font-semibold text-gray-600">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="flex-1 text-gray-800 bg-transparent px-4 py-2 rounded-md border"
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/4 font-semibold text-gray-600">Số ĐT:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            disabled={!isEditing}
            className={`flex-1 text-gray-800 px-4 py-2 rounded-md border ${
              isEditing ? "bg-gray-100" : "bg-transparent"
            }`}
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/4 font-semibold text-gray-600">
            Giới Tính:
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled={!isEditing}
            className={`flex-1 text-gray-800 px-4 py-2 rounded-md border ${
              isEditing ? "bg-gray-100" : "bg-transparent"
            }`}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="w-1/4 font-semibold text-gray-600">
            Ngày Sinh:
          </label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            disabled={!isEditing}
            className={`flex-1 text-gray-800 px-4 py-2 rounded-md border ${
              isEditing ? "bg-gray-100" : "bg-transparent"
            }`}
          />
        </div>
      </form>
      <div className="text-center mt-8">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
          >
            Lưu Thay Đổi
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
          >
            Chỉnh Sửa Hồ Sơ
          </button>
        )}
      </div>
    </div>
  );
}
