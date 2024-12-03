import React, { useState } from "react";
import StepBar from "./Partials/StepBar";
import Step1 from "./Partials/Step1";
import Step2 from "./Partials/Step2";
import Step3 from "./Partials/Step3";

const PaymentPage = () => {
  const [step, setStep] = useState(1); // Bước hiện tại, bắt đầu từ bước 1

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg ">
      <h1 className="text-2xl font-bold text-center mb-6">ĐẶT TOUR</h1>

      {/* Thanh tiến trình */}
      <StepBar step={step} />

      {/* Nút điều hướng */}
      <div className="flex justify-between mt-8">
        <button
          className={`px-6 py-2 rounded-lg font-semibold ${
            step === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-500 text-white"
          }`}
          onClick={handlePreviousStep}
          disabled={step === 1}
        >
          Quay lại
        </button>

        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold"
          onClick={handleNextStep}
        >
          {step < 3 ? "Tiếp tục" : "Đặt Ngay"}
        </button>
      </div>
      {/* Step Content */}
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
    </div>
  );
};

export default PaymentPage;
