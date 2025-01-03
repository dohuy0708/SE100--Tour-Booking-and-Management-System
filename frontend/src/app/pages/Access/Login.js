import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { handleLoginApi } from "./services/accessService";
import { resetPasswordApi } from "./services/accessService"; // Import service resetPassword

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showResetModal, setShowResetModal] = useState(false); // state để điều khiển modal
  const [resetEmail, setResetEmail] = useState(""); // email nhập để reset mật khẩu
  const [message, setMessage] = useState(""); // thông báo trạng thái
  const navigate = useNavigate();

  const handleOnChangeUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    if (!userName || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin đăng nhập!");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    try {
      const userData = await handleLoginApi(userName, password);
      const { _id, user_name, email, phone_number, date_of_birth } = userData;
      localStorage.setItem("user_id", userData._id);
      localStorage.setItem(
        "user",
        JSON.stringify({ _id, user_name, email, phone_number, date_of_birth })
      );
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý gửi email để reset mật khẩu
  const handleResetPassword = async () => {
    if (!resetEmail) {
      setMessage("Vui lòng nhập email để tiếp tục.");
      return;
    }
    try {
      const res = await resetPasswordApi(resetEmail);
      setMessage(res.message);
    } catch (error) {
      setMessage(error.message);
    }
  };
  if (isLoading)
    return (
      <div className="flex justify-center items-center py-6">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
        <span className="ml-4 text-lg text-gray-700">Đang đăng nhập...</span>
      </div>
    );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row w-[100%] max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 flex items-center justify-center bg-blue-200 relative">
          <div className="absolute inset-0 opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center">
            <img src="/logoimg.png" alt="Logo" className="h-32" />
            <img src="/logo2.png" alt="Logo" className="h-28 mb-4" />
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

            <div className="flex items-center justify-between">
              <p
                className="ml-2 text-sm text-main hover:underline cursor-pointer"
                onClick={() => setShowResetModal(true)} // Mở modal khi nhấn "Quên mật khẩu?"
              >
                Quên mật khẩu?
              </p>
            </div>

            {errorMessage && (
              <div className="text-thrd text-center mb-4">{errorMessage}</div>
            )}

            <div>
              <button
                className="w-full bg-main text-white py-2 px-4 rounded-md shadow hover:bg-blue-700"
                onClick={handleLogin}
              >
                Đăng nhập
              </button>
            </div>

            <div className="mt-4 text-center">
              <p>
                Chưa có tài khoản?{" "}
                <button
                  onClick={() => navigate("/signUp")}
                  className="text-blue-500 hover:underline"
                >
                  Đăng ký
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Reset Password */}
      {showResetModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 ">
          <div className="relative">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-2xl font-bold mb-4">Quên mật khẩu</h2>
              <p className="mb-4">
                Hãy nhập email của bạn để nhận hướng dẫn reset mật khẩu.
              </p>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                placeholder="Email của bạn"
              />
              <button
                onClick={handleResetPassword}
                className="w-full bg-main text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Gửi
              </button>
              {message && (
                <div className="mt-4 text-center text-sm text-main">
                  {message}
                </div>
              )}
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={() => setShowResetModal(false)} // Đóng modal khi ấn "X"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
