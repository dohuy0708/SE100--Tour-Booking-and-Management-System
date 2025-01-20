import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/img/Logo.png";
import logoname from "../../assets/img/LogoName2.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { notifyError, notifySuccess } from "../../components/Notification";
export default function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnChangeUserName = (event) => {
    setUsername(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    if (!userName || !password) {
      notifyError("Vui lòng nhập đầy đủ thông tin đăng nhập!");

      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail: userName, pass: password }),
        credentials: "include", // Để gửi và nhận cookie
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Đăng nhập thất bại");
      }

      const userData = await response.json();
      console.log(userData);
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Chuyển hướng đến trang chủ

      window.location.href = "/";
    } catch (e) {
      console.log(e);
      notifyError(e.message || "Đăng nhập không thành công");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {" "}
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
        <div className="flex flex-col md:flex-row w-[100%] max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left Section */}
          <div className="flex-1 flex items-center justify-center bg-blue-200 relative">
            <div className="absolute inset-0  opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center">
              <img
                src={logo} // Thay bằng đường dẫn logo
                alt="Logo"
                className=" h-32 "
              />
              <img
                src={logoname} // Thay bằng đường dẫn logo
                alt="Logo"
                className=" h-28 mb-4"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 flex flex-col justify-center px-8 py-12 relative">
            <XMarkIcon
              className="absolute right-4 top-4 h-6 hover:text-main cursor-pointer hover:bg-gray-100"
              onClick={() => {
                navigate("/");
              }}
            />
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              ĐĂNG NHẬP
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Vui lòng nhập email và mật khẩu để tiếp tục!
            </p>
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  value={userName}
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="kazetravel@gmail.com"
                  onChange={handleOnChangeUserName}
                />
              </div>

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

              {/* Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center"></div>
                <NavLink
                  to="/forgot_password" // Định nghĩa route sẽ điều hướng đến
                  className="ml-2 text-sm text-main hover:underline" // Thêm các class style
                  activeClassName="text-blue-500" // (Optional) Thêm class khi route đang được chọn
                >
                  <p className="cursor-pointer">Quên mật khẩu?</p>
                </NavLink>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  className="w-full bg-main text-white py-2 px-4 rounded-md shadow bg-blue-400 hover:bg-blue-700"
                  onClick={handleLogin}
                >
                  {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
