import React, { useState } from "react";
import { login, mockLogin } from "../../Services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleOnChangeUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    if (!userName || !password) {
      alert("Vui lòng nhập đầy đủ thông tin đăng nhập!");
      return;
    }

    setIsLoading(true); // Hiển thị trạng thái đang xử lý
    try {
      const userData = await mockLogin(userName, password);

      localStorage.setItem("user", userData.id);
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ddd] ">
      <div className="flex flex-col md:flex-row w-[100%] max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 flex items-center justify-center bg-blue-200 relative">
          <div className="absolute inset-0  opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center">
            <img
              src="/logoimg.png" // Thay bằng đường dẫn logo
              alt="Logo"
              className=" h-32 "
            />
            <img
              src="/logo2.png" // Thay bằng đường dẫn logo
              alt="Logo"
              className=" h-28 mb-4"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12">
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

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-main border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Nhớ mật khẩu
                </label>
              </div>
              <a href="#" className="ml-2 text-sm text-main hover:underline">
                Quên mật khẩu?
              </a>
            </div>

            {/* Submit Button */}
            <div>
              <button
                className="w-full bg-main text-white py-2 px-4 rounded-md shadow hover:bg-blue-700"
                onClick={handleLogin}
              >
                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
