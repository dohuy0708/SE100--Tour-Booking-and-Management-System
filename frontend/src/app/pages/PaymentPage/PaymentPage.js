import React, { useState, useEffect } from "react";
import StepBar from "./Partials/StepBar";
import Step1 from "./Partials/Step1";
import Step2 from "./Partials/Step2";
import Step3 from "./Partials/Step3";
import { useLocation } from "react-router-dom";
import { getTourInfo } from "../../Services/userService";
import { getTourDetails } from "../TourPage/tourService";
import { ToastContainer, toast } from "react-toastify";
import { sPayment } from "./paymentStore";
const PaymentPage = () => {
  const bookingInfo = sPayment.slice((n) => n.info).use();
  const passengerList = sPayment.slice((n) => n.passengers).use();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const tourId = searchParams.get("tourId");
  const dayId = searchParams.get("dayId");

  const [tour, setTour] = useState(null); // Lưu thông tin tour
  const [day, setDay] = useState(null); // Lưu thông tin ngày tour
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchTourInfo = async () => {
      try {
        const fetchedTour = await getTourDetails(tourId);
        setTour(fetchedTour[0]);
        const fetchedDay = fetchedTour[0]?.tourSchedules?.find(
          (day) => day._id === dayId
        );
        console.log("ngày: ", fetchedDay);
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
  const validateStep1 = (bookingInfo, passengerList) => {
    let isValid = true;

    // Kiểm tra bookingInfo
    if (!bookingInfo.name.trim()) {
      toast.error("Tên liên lạc không được để trống!");
      isValid = false;
    }
    if (!bookingInfo.email.trim() || !/\S+@\S+\.\S+/.test(bookingInfo.email)) {
      toast.error("Email không hợp lệ!");
      isValid = false;
    }
    if (!bookingInfo.phone.trim() || !/^[0-9]{10}$/.test(bookingInfo.phone)) {
      toast.error("Số điện thoại không hợp lệ!");
      isValid = false;
    }
    if (!bookingInfo.address.trim()) {
      toast.error("Địa chỉ không được để trống!");
      isValid = false;
    }

    // Kiểm tra passengerList
    passengerList.forEach((passenger, index) => {
      if (!passenger.name.trim()) {
        toast.error(`Tên hành khách ${index + 1} không được để trống!`);
        isValid = false;
      }
      if (!passenger.gender) {
        toast.error(`Giới tính hành khách ${index + 1} không được để trống!`);
        isValid = false;
      }
      if (!passenger.dob.trim() || !isValidDob(passenger.dob, passenger.type)) {
        toast.error(
          `Ngày sinh của hành khách ${
            index + 1
          } không hợp lệ với loại hành khách!`
        );
        isValid = false;
      }
    });

    return isValid;
  };

  // Hàm kiểm tra ngày sinh hợp lệ theo loại hành khách
  const isValidDob = (dob, type) => {
    const age = calculateAge(new Date(dob));
    if (type === "adult" && age < 12) return false;
    if (type === "children" && (age < 3 || age > 11)) return false;
    if (type === "infant" && age >= 3) return false;
    return true;
  };

  // Hàm tính tuổi từ ngày sinh
  const calculateAge = (dob) => {
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    return m < 0 || (m === 0 && today.getDate() < dob.getDate())
      ? age - 1
      : age;
  };

  const handleNextStep = () => {
    if (step < 3) {
      if (step === 1) {
        if (!validateStep1(bookingInfo, passengerList)) return;
      }
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
      {step === 1 && <Step1 tour={tour} schedule={day} />}
      {step === 2 && <Step2 tour={tour} schedule={day} />}
      {step === 3 && <Step3 tour={tour} />}

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
      <ToastContainer />
    </div>
  );
};

export default PaymentPage;
