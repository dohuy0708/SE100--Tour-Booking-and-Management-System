import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/img/Logo.png";
import logoname from "../../assets/img/LogoName2.png";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError } from "../../components/Notification";

const ForgotPassPage = () => {
  const [userName, setUsername] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnChangeUserName = (event) => {
    setUsername(event.target.value);
  };

  const handleGetPassword = async () => {
    console.log("click");
    if (!userName) {
      notifyError("Vui lòng nhập đầy đủ thông tin đăng nhập!");
      return;
    }

    setIsLoading(true);
    try {
      // Gọi API đặt lại mật khẩu
      const response = await fetch("http://localhost:8080/auth/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail: userName }),
        credentials: "include", // Gửi email/tên người dùng
      });

      const data = await response.json();

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Tạo mật khẩu mới thành công",
          text: "Mật khẩu mới đã được gửi tới email của bạn.",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate("/login"); // Điều hướng về trang login sau khi gửi email
        });
      } else {
        notifyError(data.message); // Hiển thị lỗi nếu có
      }
    } catch (e) {
      notifyError("Đã có lỗi xảy ra vui lòng thử lại");
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
            QUÊN MẬT KHẨU
          </h2>
          <p className="text-center text-gray-600 mb-2">
            Vui lòng nhập email của bạn để lấy lại mật khẩu!
          </p>
          <p className="text-center text-gray-600 mb-2">
            Mật khẩu mới sẽ được gửi về email của bạn.
          </p>
          <div className="space-y-4">
            {/* Email Input */}
            <div className="py-10">
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

            {/* Submit Button */}
            <div>
              <button
                className="w-full bg-main text-white py-2 px-4 rounded-md shadow bg-blue-400 hover:bg-blue-700"
                onClick={handleGetPassword}
              >
                {isLoading ? "Đang xử lý..." : "Gửi "}
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

export default ForgotPassPage;
