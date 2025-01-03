import React, { useState, useEffect } from "react";
import { sPayment } from "../paymentStore"; // Import Signify store
import SummaryCard from "./SummaryCard";

const Step2 = ({ tour, schedule }) => {
  // Lấy dữ liệu từ Signify store
  const paymentData = sPayment.use();
  const passengers = paymentData.passengers;

  // State để lưu thời hạn thanh toán
  const [paymentDeadline, setPaymentDeadline] = useState("");

  // Tính toán thời hạn thanh toán mỗi khi vào trang
  useEffect(() => {
    const calculateDeadline = () => {
      const now = new Date();
      sPayment.set((pre) => (pre.value.date = now));
      now.setDate(now.getDate() + 1); // Cộng thêm 1 ngày
      const formattedDate = now.toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      setPaymentDeadline(formattedDate);
    };

    calculateDeadline();
  }, []); // Chạy 1 lần khi component được render

  return (
    <div className="grid grid-cols-3">
      <div className="p-6 col-span-2 rounded-lg shadow-lg space-y-6">
        {/* CHI TIẾT BOOKING */}
        <div className="border rounded-lg bg-white p-4 shadow-sm">
          <h2 className="text-lg text-main font-semibold border-b pb-2 mb-4">
            CHI TIẾT BOOKING
          </h2>
          <div className="grid grid-cols-2 gap-4 font-medium">
            <p>
              <span className="font-medium">Người đặt:</span>{" "}
              <span className="text-thrd"> {paymentData.info.name}</span>
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              <span className="text-thrd"> {paymentData.info.email}</span>
            </p>
            <p>
              <span className="font-medium">SĐT:</span>{" "}
              <span className="text-thrd"> {paymentData.info.phone}</span>
            </p>
            <p>
              <span className="font-medium">Ngày sinh:</span>{" "}
              <span className="text-thrd"> {paymentData.info.dob}</span>
            </p>
            <p>
              <span className="font-medium">Mã tour:</span>{" "}
              <span className="text-thrd"> {tour.tour_code}</span>
            </p>
            <p>
              <span className="font-medium">Hình thức thanh toán:</span>{" "}
              <span className="text-thrd"> {paymentData.paymentMethod}</span>
            </p>
            <p>
              <span className="font-medium">Trị giá booking:</span>{" "}
              <span className="text-thrd">
                {" "}
                {paymentData.price.toLocaleString()} đ
              </span>
            </p>

            {/* <p className="col-span-2">
              <span className="font-medium">Tình trạng:</span>{" "}
              <span className="text-main font-semibold">
                Booking của quý khách đã được chúng tôi xác nhận thành công
              </span>
            </p> */}
            <p>
              <span className="font-medium">Thời hạn thanh toán:</span>{" "}
              <span className="text-thrd">{paymentDeadline}</span>
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            (Theo giờ Việt Nam. Booking sẽ tự động hủy nếu quá thời hạn thanh
            toán trên)
          </p>
        </div>

        {/* DANH SÁCH HÀNH KHÁCH */}
        <div className="border rounded-lg bg-white p-4 shadow-sm">
          <h2 className="text-lg text-main font-semibold border-b pb-2 mb-4">
            DANH SÁCH HÀNH KHÁCH
          </h2>
          <div>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="font-medium border-b pb-2">
                  <th className="px-4 py-2 text-left">Họ tên</th>
                  <th className="px-4 py-2 text-left">Ngày sinh</th>
                  <th className="px-4 py-2 text-left">Giới tính</th>
                  <th className="px-4 py-2 text-left">Độ tuổi</th>
                </tr>
              </thead>
              <tbody>
                {passengers.map((p, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.date}</td>
                    <td className="px-4 py-2">{p.gender}</td>
                    <td className="px-4 py-2">
                      {p.type === "ADULT"
                        ? "Người lớn (trên 12 tuổi)"
                        : p.type === "CHILD"
                        ? "Trẻ em (từ 3 đến 11 tuổi)"
                        : p.type === "INFANT"
                        ? "Em bé (dưới 3 tuổi)"
                        : "Khác"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right font-semibold mt-2 text-lg">
              Tổng cộng:{" "}
              <span className=" text-thrd">
                {paymentData.price.toLocaleString()} đ
              </span>
            </div>
          </div>
        </div>
      </div>
      <SummaryCard tour={tour} schedule={schedule} />
    </div>
  );
};

export default Step2;
