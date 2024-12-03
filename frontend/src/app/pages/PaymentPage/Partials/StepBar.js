import React from "react";

const StepBar = ({ step }) => {
  // Các bước và icon tương ứng
  const steps = [
    { label: "NHẬP THÔNG TIN", icon: "📋" }, // Thay biểu tượng bằng hình ảnh nếu có
    { label: "THANH TOÁN", icon: "💳" },
    { label: "HOÀN TẤT", icon: "✅" },
  ];

  return (
    <div className="flex items-center justify-center space-x-8 mb-8">
      {steps.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {/* Icon và vòng tròn */}
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
              step === index + 1 ? "bg-blue-500 border-blue-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`text-2xl ${
                step === index + 1 ? "text-white" : "text-gray-600"
              }`}
            >
              {item.icon}
            </span>
          </div>

          {/* Label */}
          <div
            className={`text-sm font-semibold ${
              step === index + 1 ? "text-blue-500" : "text-gray-500"
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
