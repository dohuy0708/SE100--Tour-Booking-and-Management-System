import React from "react";
import {
  CheckCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { sPayment } from "../paymentStore";
import { useNavigate } from "react-router-dom";
export default function Step3({ tour }) {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };
  return (
    <div className=" flex items-center justify-center p-4">
      <div className="w-full bg-gray-100 max-w-3xl rounded-lg shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-main mb-6">
          XÁC NHẬN ĐẶT TOUR THÀNH CÔNG
        </h1>

        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="w-16 h-16 text-green-500" />
        </div>

        <p className="text-xl font-medium mb-6">
          Tour của bạn đã được đặt thành công!
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Mã số booking:</span>
            <span className="text-main">2409MLD</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-medium">Mã Tour:</span>
            <span className="text-main">{tour.tour_code}</span>
          </div>

          <div className="mt-6">
            <p className="font-medium mb-2">
              Vui lòng kiểm tra thông tin chi tiết tại email:
            </p>
            <p className="text-gray-600 italic">{sPayment.value.info.email}</p>
          </div>
        </div>

        <button
          className="bg-main text-white px-8 py-2 rounded-md hover:bg-blue-700 transition-colors mb-8"
          onClick={handleBackToHome}
        >
          Trang chủ
        </button>

        <div className="border-t pt-6 space-y-3">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <PhoneIcon className="w-4 h-4" />
            <span>Hotline: 1900 1808</span>
          </div>

          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <EnvelopeIcon className="w-4 h-4" />
            <span>Email: info@saigontourist.net</span>
          </div>
        </div>
      </div>
    </div>
  );
}
