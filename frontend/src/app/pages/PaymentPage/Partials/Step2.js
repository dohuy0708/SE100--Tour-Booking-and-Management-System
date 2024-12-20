import React from "react";
import { sPayment } from "../paymentStore"; // Import Signify store

const Step2 = () => {
  // Lấy dữ liệu từ Signify store
  const paymentData = sPayment.use();
  const passengers = paymentData.passengers;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg space-y-6">
      {/* THÔNG TIN LIÊN LẠC */}
      <div className="border rounded-lg bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">
          THÔNG TIN LIÊN LẠC
        </h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
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
        <h2 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">
          CHI TIẾT BOOKING
        </h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-medium">Số booking:</span>{" "}
            <span className="text-red-500">
              {paymentData.bookingId || "2409281GCJML"}
            </span>
          </p>
          <p>
            <span className="font-medium">Ngày tạo:</span>{" "}
            {paymentData.createdAt || "28/09/2024 09:50"}
          </p>
          <p>
            <span className="font-medium">Trị giá booking:</span>{" "}
            {paymentData.totalAmount || "21,990,000 đ"}
          </p>
          <p>
            <span className="font-medium">Hình thức thanh toán:</span>{" "}
            {paymentData.paymentMethod || "Thanh toán Momo"} -{" "}
            <span className="text-blue-500 cursor-pointer">
              Thay đổi hình thức thanh toán
            </span>
          </p>
          <p>
            <span className="font-medium">Số tiền đã thanh toán:</span> 0 đ
          </p>
          <p>
            <span className="font-medium">Số tiền còn lại:</span>{" "}
            {paymentData.totalAmount || "21,990,000 đ"}
          </p>
          <p>
            <span className="font-medium">Tình trạng:</span>{" "}
            <span className="text-blue-500">
              Booking của quý khách đã được chúng tôi xác nhận thành công
            </span>
          </p>
          <p>
            <span className="font-medium">Thời hạn thanh toán:</span>{" "}
            <span className="text-red-500">
              {paymentData.paymentDeadline || "30/09/2024 09:50"}
            </span>
          </p>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          (Theo giờ Việt Nam. Booking sẽ tự động hủy nếu quá thời hạn thanh toán
          trên)
        </p>
      </div>

      {/* DANH SÁCH HÀNH KHÁCH */}
      <div className="border rounded-lg bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">
          DANH SÁCH HÀNH KHÁCH
        </h2>
        <div>
          <div className="flex justify-between font-medium border-b pb-2 text-gray-700">
            <span>Họ tên</span>
            <span>Ngày sinh</span>
            <span>Giới tính</span>
            <span>Độ tuổi</span>
            <span>Phòng đơn</span>
          </div>
          {passengers.length > 0 ? (
            passengers.map((p, index) => (
              <div
                key={index}
                className="flex justify-between py-2 border-b text-gray-600"
              >
                <span>{p.name || "Chưa cập nhật"}</span>
                <span>{p.dob || "N/A"}</span>
                <span>{p.gender || "Nam"}</span>
                <span>
                  {p.type === "adult" ? "Người lớn (19 tuổi)" : "Khác"}
                </span>
                <span>Không</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">
              Không có thông tin hành khách
            </p>
          )}
          <div className="text-right font-semibold mt-2 text-lg text-red-500">
            Tổng cộng: {paymentData.totalAmount || "21,990,000 đ"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
