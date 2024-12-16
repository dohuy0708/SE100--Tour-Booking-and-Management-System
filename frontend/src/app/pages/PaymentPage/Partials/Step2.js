import React from "react";

export default function Step2() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
        {/* Thông tin liên lạc */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">THÔNG TIN LIÊN LẠC</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <span className="font-semibold">Họ tên:</span> Đỗ Nguyễn Hoàng
                Huy
              </p>
              <p>
                <span className="font-semibold">Địa chỉ:</span> hcm
              </p>
              <p>
                <span className="font-semibold">Ghi chú:</span> Booking từ
                Travel.com.vn (Tour giờ chót - 2,000,000 đ/1 khách.)
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                dohuy22314@gmail.com
              </p>
              <p>
                <span className="font-semibold">Điện thoại:</span> ******722
              </p>
            </div>
          </div>
        </div>

        {/* Chi tiết booking */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">CHI TIẾT BOOKING</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <span className="font-semibold">Số booking:</span> 2409281GCJML
              </p>
              <p>
                <span className="font-semibold">Ngày tạo:</span> 28/09/2024
                09:50
              </p>
              <p>
                <span className="font-semibold">Trị giá booking:</span>{" "}
                21,990,000 đ
              </p>
              <p>
                <span className="font-semibold">Hình thức thanh toán:</span>{" "}
                Thanh toán Momo -{" "}
                <span className="text-blue-500 cursor-pointer">
                  Thay đổi hình thức thanh toán
                </span>
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Số tiền đã thanh toán:</span> 0
                đ
              </p>
              <p>
                <span className="font-semibold">Số tiền còn lại:</span>{" "}
                21,990,000 đ
              </p>
              <p>
                <span className="font-semibold">Tình trạng:</span>{" "}
                <span className="text-green-600 font-semibold">
                  Booking của quý khách đã được chúng tôi xác nhận thành công
                </span>
              </p>
              <p>
                <span className="font-semibold">Thời hạn thanh toán:</span>{" "}
                30/09/2024 09:50 (Theo giờ Việt Nam. Booking sẽ tự động hủy nếu
                quá thời hạn thanh toán trên)
              </p>
            </div>
          </div>
        </div>

        {/* Danh sách hành khách */}
        <div>
          <h2 className="text-lg font-bold mb-4">DANH SÁCH HÀNH KHÁCH</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Họ tên</th>
                <th className="border border-gray-300 p-2">Ngày sinh</th>
                <th className="border border-gray-300 p-2">Giới tính</th>
                <th className="border border-gray-300 p-2">Độ tuổi</th>
                <th className="border border-gray-300 p-2">Phòng đơn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  Đỗ Nguyễn Hoàng Huy
                </td>
                <td className="border border-gray-300 p-2">05/05/2005</td>
                <td className="border border-gray-300 p-2">Nam</td>
                <td className="border border-gray-300 p-2">
                  Người lớn (19 tuổi)
                </td>
                <td className="border border-gray-300 p-2">Không</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4 text-right font-bold text-lg">
            Tổng cộng: 21,990,000 đ
          </div>
        </div>
      </div>
    </div>
  );
}
