import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/img/Logo.png";
import logoname from "../../assets/img/LogoName2.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError } from "../../components/Notification";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const ResetPasswordPage = () => {
  const { user } = useAuth();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleOnChangeNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleOnChangeConfirmNewPassword = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleResetPassword = async () => {
    if (!password || !newPassword || !confirmNewPassword) {
      notifyError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (newPassword.length < 8) {
      notifyError("Mật khẩu phải có ít nhất 8 ký tự!");
      return;
    }

    // Kiểm tra mật khẩu mới và nhập lại mật khẩu mới có trùng nhau không
    if (newPassword !== confirmNewPassword) {
      notifyError("Nhập lại mật khẩu mới chưa đúng!");
      return;
    }

    setIsLoading(true);
    try {
      // Gọi API từ server để reset mật khẩu
      const response = await fetch("http://localhost:8080/auth/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: user.email, // Đây là email của người dùng cần đổi mật khẩu
          oldpass: password,
          newpass: newPassword,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Show SweetAlert success message
        Swal.fire({
          icon: "success",
          title: "Đổi mật khẩu thành công",

          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate("/"); // Redirect to homepage after success
        });
      } else {
        notifyError(data.message);
      }
    } catch (e) {
      console.error("Error:", e);
      alert("Có lỗi xảy ra khi đổi mật khẩu!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
      <ToastContainer />
      <div className="flex flex-col md:flex-row w-[100%] max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 flex items-center justify-center bg-blue-200 relative">
          <div className="absolute inset-0 opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center">
            <img src={logo} alt="Logo" className="h-32" />
            <img src={logoname} alt="Logo" className="h-28 mb-4" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12 relative">
          <XMarkIcon
            className="absolute right-4 top-4 h-6 hover:text-main cursor-pointer hover:bg-gray-100"
            onClick={() => navigate("/")}
          />
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            ĐỔI MẬT KHẨU
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Nhập mật khẩu và mật khẩu mới!
          </p>
          <div className="space-y-4">
            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div className="flex items-center mt-1">
                <input
                  value={password}
                  type="password"
                  id="password"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="••••••••"
                  onChange={handleOnChangePassword}
                />
              </div>
            </div>

            {/* New Password Input */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu mới
              </label>
              <div className="flex items-center mt-1">
                <input
                  value={newPassword}
                  type="password"
                  id="newPassword"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="••••••••"
                  onChange={handleOnChangeNewPassword}
                />
              </div>
            </div>

            {/* Confirm New Password Input */}
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Nhập lại mật khẩu mới
              </label>
              <div className="flex items-center mt-1">
                <input
                  value={confirmNewPassword}
                  type="password"
                  id="confirmNewPassword"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="••••••••"
                  onChange={handleOnChangeConfirmNewPassword}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                className="w-full bg-main text-white py-2 px-4 rounded-md shadow bg-blue-400 hover:bg-blue-700"
                onClick={handleResetPassword}
              >
                {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
              </button>
            </div>

            {/* Back Button */}
            <div>
              <button
                className="w-full bg-gray-400 text-white py-2 px-4 rounded-md shadow hover:bg-gray-500"
                onClick={() => navigate("/")}
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
