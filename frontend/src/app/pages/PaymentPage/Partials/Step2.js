import React from "react";
import { sPayment } from "../paymentStore"; // Import Signify store
import SummaryCard from "./SummaryCard";

const Step2 = ({ tour, day }) => {
  // Lấy dữ liệu từ Signify store
  const paymentData = sPayment.use();
  const passengers = paymentData.passengers;

  return (
    <div className="grid grid-cols-3">
      <div className="p-6 col-span-2 rounded-lg shadow-lg space-y-6">
        {/* THÔNG TIN LIÊN LẠC */}
        <div className="border rounded-lg bg-white p-4 shadow-sm">
          <h2 className="text-lg text-main font-semibold border-b pb-2 mb-4">
            THÔNG TIN LIÊN LẠC
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <span className="font-medium">Họ tên:</span>{" "}
                {paymentData.info.name}
              </p>
              <p>
                <span className="font-medium">Địa chỉ:</span>{" "}
                {paymentData.info.address}
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {paymentData.info.email}
              </p>
              <p>
                <span className="font-medium">Điện thoại:</span>{" "}
                {paymentData.info.phone}
              </p>
            </div>
          </div>
          <p className="mt-2 text-gray-500 text-sm">{paymentData.note}</p>
        </div>

        {/* CHI TIẾT BOOKING */}
        <div className="border rounded-lg bg-white p-4 shadow-sm">
          <h2 className="text-lg text-main font-semibold border-b pb-2 mb-4">
            CHI TIẾT BOOKING
          </h2>
          <div className="grid grid-cols-2 gap-4 font-medium">
            <p>
              <span className="font-medium">Số booking:</span>{" "}
              <span className="text-red">
                {paymentData.id || "2409281GCJML"}
              </span>
            </p>
            <p>
              <span className="font-medium">Ngày tạo:</span>{" "}
              <span className="text-red">
                {" "}
                {paymentData.createdAt || "28/09/2024 09:50"}
              </span>
            </p>
            <p>
              <span className="font-medium">Trị giá booking:</span>{" "}
              <span className="text-red">
                {" "}
                {paymentData.price.toLocaleString()} đ
              </span>
            </p>
            <p>
              <span className="font-medium">Hình thức thanh toán:</span>{" "}
              <span className="text-red"> {paymentData.paymentMethod}</span>
            </p>
            <p>
              <span className="font-medium">Số tiền đã thanh toán:</span>{" "}
              <span className="text-red">0 đ</span>
            </p>
            <p>
              <span className="font-medium">Số tiền còn lại:</span>{" "}
              <span className="text-red">
                {paymentData.price.toLocaleString()} đ
              </span>
            </p>
            <p className=" col-span-2">
              <span className="font-medium">Tình trạng:</span>{" "}
              <span className="text-main font-semibold">
                Booking của quý khách đã được chúng tôi xác nhận thành công
              </span>
            </p>
            <p>
              <span className="font-medium">Thời hạn thanh toán:</span>{" "}
              <span className="text-red">
                {paymentData.paymentDeadline || "30/09/2024 09:50"}
              </span>
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
                    <td className="px-4 py-2">{p.dob}</td>
                    <td className="px-4 py-2">{p.gender}</td>
                    <td className="px-4 py-2">
                      {p.type === "adult"
                        ? "Người lớn (trên 19 tuổi)"
                        : p.type === "children"
                        ? "Trẻ em (từ 3 đến 18 tuổi)"
                        : p.type === "baby"
                        ? "Em bé (dưới 3 tuổi)"
                        : "Khác"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right font-semibold mt-2 text-lg">
              Tổng cộng:{" "}
              <span className=" text-red">
                {paymentData.price.toLocaleString()} đ
              </span>
            </div>
          </div>
        </div>
      </div>
      <SummaryCard tour={tour} day={day} />
    </div>
  );
};

export default Step2;
