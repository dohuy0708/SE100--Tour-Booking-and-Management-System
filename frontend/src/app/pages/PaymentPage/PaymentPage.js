import React, { useState, useEffect } from "react";
import StepBar from "./Partials/StepBar";
import Step1 from "./Partials/Step1";
import Step2 from "./Partials/Step2";
import Step3 from "./Partials/Step3";
import { useLocation } from "react-router-dom";
import { getTourInfo } from "../../Services/userService";

const PaymentPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const tourId = parseInt(searchParams.get("tourId"));
  const dayId = parseInt(searchParams.get("dayId"));

  const [tour, setTour] = useState(null); // Lưu thông tin tour
  const [day, setDay] = useState(null); // Lưu thông tin ngày tour
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchTourInfo = async () => {
      try {
        const fetchedTour = await getTourInfo(tourId);
        setTour(fetchedTour);
        const fetchedDay = fetchedTour?.days?.find((day) => day.id === dayId);
        setDay(fetchedDay);
        setIsLoading(false);
      } catch (err) {
        setError("Lỗi khi lấy thông tin tour");
        setIsLoading(false);
      }
    };

    fetchTourInfo();
  }, [tourId, dayId]);

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

  if (isLoading) {
    return <div>Đang tải thông tin tour...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold text-main text-center mb-6">
        ĐẶT TOUR
      </h1>

      {/* Thanh tiến trình */}
      <StepBar step={step} />

      {/* Step Content */}
      {step === 1 && <Step1 tour={tour} day={day} />}
      {step === 2 && <Step2 tour={tour} day={day} />}
      {step === 3 && <Step3 />}

      {/* Nút điều hướng */}
      {step < 3 ? (
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
            className="px-6 py-2 bg-main text-white rounded-lg font-semibold"
            onClick={handleNextStep}
          >
            Tiếp tục
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PaymentPage;
