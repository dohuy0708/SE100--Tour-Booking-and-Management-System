import {
  CheckCircleIcon,
  CreditCardIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const StepBar = ({ step }) => {
  // Các bước và icon tương ứng
  const steps = [
    { label: "NHẬP THÔNG TIN", icon: <DocumentTextIcon className="h-6" /> }, // Thay biểu tượng bằng hình ảnh nếu có
    { label: "THANH TOÁN", icon: <CreditCardIcon className="h-6" /> },
    { label: "HOÀN TẤT", icon: <CheckCircleIcon className="h-6" /> },
  ];

  return (
    <div className="flex items-center justify-center space-x-8 mb-8">
      {steps.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
              step >= index + 1 ? "bg-main border-main" : "bg-gray-300"
            }`}
          >
            <span
              className={`text-2xl ${
                step >= index + 1 ? "text-white" : "text-gray-600"
              }`}
            >
              {item.icon}
            </span>
          </div>

          <div
            className={`text-sm font-semibold ${
              step >= index + 1 ? "text-main" : "text-gray-500"
            }`}
          >
            {item.label}
          </div>

          {/* Mũi tên giữa các bước */}
          {index < steps.length - 1 && (
            <div className="text-gray-400 text-xl">➔</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepBar;
