import React, { useState } from "react";
import { resetPassword } from "../services/profileService"; // Import service resetPassword

export default function ChangePassword({ email }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    confirmPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false); // Thêm state để theo dõi trạng thái tải
  const [message, setMessage] = useState(""); // Để hiển thị thông báo

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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

  const handleSave = async () => {
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

    setLoading(true); // Bật loading khi đang gửi yêu cầu
    setMessage(""); // Reset message trước khi gửi

    try {
      const response = await resetPassword(
        email,
        formData.currentPassword,
        formData.newPassword
      );
      setMessage(response.message || "Mật khẩu đã được thay đổi thành công");
    } catch (error) {
      setMessage("Đã có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false); // Tắt loading sau khi hoàn thành
    }
  };

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
              error.newPassword ? "border-thrd" : "border-gray-300"
            } bg-transparent`}
          />
        </div>
        {error.newPassword && (
          <p className="text-thrd text-sm mt-1">{error.newPassword}</p>
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
              error.confirmPassword ? "border-thrd" : "border-gray-300"
            } bg-transparent`}
          />
        </div>
        {error.confirmPassword && (
          <p className="text-thrd text-sm mt-1">{error.confirmPassword}</p>
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
          disabled={!isFormValid || loading}
        >
          {loading ? "Đang thay đổi..." : "Lưu Thay Đổi"}
        </button>
        {message && (
          <p
            className={`mt-4 text-sm ${
              message.includes("thành công") ? "text-green-600" : "text-thrd"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
