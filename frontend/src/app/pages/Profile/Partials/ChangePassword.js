import React, { useState } from "react";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    confirmPassword: "", // Lỗi cho trường nhập lại mật khẩu
    newPassword: "", // Lỗi cho trường mật khẩu mới
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Kiểm tra mật khẩu xác nhận có khớp với mật khẩu mới không
    if (name === "confirmPassword") {
      if (value !== formData.newPassword) {
        setError((prev) => ({
          ...prev,
          confirmPassword: "Mật khẩu xác nhận không khớp",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          confirmPassword: "",
        }));
      }
    }

    // Kiểm tra xem mật khẩu mới có giống mật khẩu cũ không
    if (name === "newPassword") {
      if (value === formData.currentPassword) {
        setError((prev) => ({
          ...prev,
          newPassword: "Mật khẩu mới không được giống mật khẩu cũ",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          newPassword: "",
        }));
      }
    }
  };

  const handleSave = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Mật khẩu xác nhận không khớp",
      }));
      return;
    }

    if (formData.newPassword === formData.currentPassword) {
      setError((prev) => ({
        ...prev,
        newPassword: "Mật khẩu mới không được giống mật khẩu cũ",
      }));
      return;
    }

    // Xử lý thay đổi mật khẩu tại đây
    console.log("Mật khẩu đã được thay đổi:", formData);
  };

  // Kiểm tra có lỗi hay không để vô hiệu hóa nút lưu
  const isFormValid =
    !error.newPassword &&
    !error.confirmPassword &&
    formData.newPassword &&
    formData.confirmPassword;

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
        Thay Đổi Mật Khẩu
      </h2>
      <form className="space-y-6">
        <div className="flex items-center">
          <label className="w-1/4 font-semibold text-gray-600">
            Mật khẩu hiện tại:
          </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="flex-1 text-gray-800 px-4 py-2 rounded-md border bg-transparent"
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/4 font-semibold text-gray-600">
            Mật khẩu mới:
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className={`flex-1 text-gray-800 px-4 py-2 rounded-md border ${
              error.newPassword ? "border-red-500" : "border-gray-300"
            } bg-transparent`}
          />
        </div>
        {error.newPassword && (
          <p className="text-red-500 text-sm mt-1">{error.newPassword}</p>
        )}

        <div className="flex items-center">
          <label className="w-1/4 font-semibold text-gray-600">
            Nhập lại mật khẩu mới:
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`flex-1 text-gray-800 px-4 py-2 rounded-md border ${
              error.confirmPassword ? "border-red-500" : "border-gray-300"
            } bg-transparent`}
          />
        </div>
        {error.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>
        )}
      </form>
      <div className="text-center mt-8">
        <button
          onClick={handleSave}
          className={`px-6 py-3 font-semibold rounded-lg hover:bg-blue-700 ${
            isFormValid
              ? "bg-main text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Lưu Thay Đổi
        </button>
      </div>
    </div>
  );
}
