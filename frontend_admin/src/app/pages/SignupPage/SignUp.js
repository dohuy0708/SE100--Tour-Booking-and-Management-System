import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/Logo.png";
import logoname from "../../assets/img/LogoName2.png";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError } from "../../components/Notification";
const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Kiểm tra các trường nhập
    if (!fullName || !email || !phoneNumber || !dob) {
      notifyError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken"); // Thay đổi tùy vào cách lưu trữ token của bạn
      // Gọi API đăng ký từ server
      const response = await fetch("http://localhost:8080/createstaff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          phone: phoneNumber,
          dob: dob,
        }),
        credentials: "include", // Gửi cookie trong request
      });

      const data = await response.json();

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Đăng ký  thành công",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate("/"); // Redirect to homepage after success
        }); // Chuyển hướng về trang chính sau khi đăng ký
      } else {
        notifyError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      notifyError("Đã có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            ĐĂNG KÝ NHÂN VIÊN MỚI
          </h2>

          <div className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Họ tên:
              </label>
              <input
                value={fullName}
                type="text"
                id="fullName"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Nguyễn Văn A"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                value={email}
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Số điện thoại:
              </label>
              <input
                value={phoneNumber}
                type="text"
                id="phoneNumber"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="0901234567"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {/* Date of Birth Input */}
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700"
              >
                Ngày sinh:
              </label>
              <input
                value={dob}
                type="date"
                id="dob"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                className="w-full bg-blue-400 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700"
                onClick={handleSubmit}
              >
                {isLoading ? "Đang xử lý..." : "Đăng ký"}
              </button>
            </div>

            {/* Back Button */}
            <div>
              <button
                className="w-full bg-gray-400 text-white py-2 px-4 rounded-md shadow hover:bg-gray-500"
                onClick={() => navigate("/Staff")}
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

export default SignUp;
