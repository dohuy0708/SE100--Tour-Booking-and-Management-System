import React, { useState, useEffect } from "react";
import StepBar from "./Partials/StepBar";
import Step1 from "./Partials/Step1";
import Step2 from "./Partials/Step2";
import Step3 from "./Partials/Step3";
import { useLocation } from "react-router-dom";
import { getTourById, getTourDetails } from "../TourPage/tourService";
import { ToastContainer, toast } from "react-toastify";
import { sPayment } from "./paymentStore";
import { handleCreateBooking } from "./services/paymentService";

const PaymentPage = () => {
  const sBooking = sPayment.use();
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

  const [step, setStep] = useState(1); // Bước hiện tại, bắt đầu từ bước 1
  const [showModal, setShowModal] = useState(false); // Hiển thị modal
  const [confirmNextStep, setConfirmNextStep] = useState(false); // Xác nhận tiếp tục bước 2

  useEffect(() => {
    const fetchTourInfo = async () => {
      try {
        const fetchedTour = await getTourById(tourId);
        setTour(fetchedTour);
        const fetchedDay = fetchedTour?.tourSchedules?.find(
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
      if (
        !passenger.date.trim() ||
        !isValidDob(passenger.date, passenger.type)
      ) {
        toast.error(
          `Ngày sinh của hành khách ${
            index + 1
          } không hợp lệ với loại hành khách!`
        );
        isValid = false;
      }
    });
    if (passengerList.length === 0) {
      toast.error("Chưa có hành khách nào");
      isValid = false;
    }
    if (!sBooking.paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán!");
      isValid = false;
    }
    return isValid;
  };

  const isValidDob = (dob, type) => {
    const age = calculateAge(new Date(dob));
    if (type === "ADULT" && age < 12) return false;
    if (type === "CHILDREN" && (age < 3 || age > 11)) return false;
    if (type === "INFANT" && age >= 3) return false;
    return true;
  };

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
      if (step === 2) {
        setShowModal(true); // Hiển thị modal xác nhận khi đến bước 2
        return;
      }
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleConfirmNextStep = async () => {
    setConfirmNextStep(true); // Đánh dấu đã xác nhận
    setShowModal(false); // Đóng modal
    try {
      // Gọi hàm tạo booking
      const result = await handleCreateBooking(
        bookingInfo.name,
        bookingInfo.phone,
        bookingInfo.email,
        bookingInfo.address,
        dayId,
        sBooking.date,
        sBooking.price,
        "CHỜ XÁC NHẬN", // Trạng thái đơn hàng
        passengerList.length,
        sBooking.paymentMethod, // Phương thức thanh toán
        passengerList
      );
      console.log("Booking created successfully:", result);

      setStep(step + 1); // Chuyển đến bước tiếp theo
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Lỗi khi tạo đặt chỗ!");
    }
  };
  const handleCancelNextStep = () => {
    setShowModal(false); // Đóng modal nếu người dùng hủy
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-mincontent py-6">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
        <span className="ml-4 text-lg text-gray-700">Đang tải...</span>
      </div>
    );
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

      {/* Modal xác nhận */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
            <h2 className="text-xl font-bold text-center mb-4">
              Bạn có xác nhận đặt chuyến đi?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 bg-main text-white rounded-lg"
                onClick={handleConfirmNextStep}
              >
                OK
              </button>
              <button
                className="px-6 py-2 bg-gray-300 text-gray-600 rounded-lg"
                onClick={handleCancelNextStep}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default PaymentPage;
