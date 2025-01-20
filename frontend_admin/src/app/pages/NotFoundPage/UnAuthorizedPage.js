import React from "react";
import { useNavigate } from "react-router-dom";

export default function UnAuthorizedPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Điều hướng về trang chủ
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="text-center bg-white p-6 rounded-lg shadow-lg   w-5/12">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Lưu ý !</h2>
        <p className="text-lg text-gray-700 mb-4">
          Bạn không được phép truy cập vào trang này!!
        </p>
        <button
          onClick={handleGoHome}
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
}
