import React from "react";
import { sPayment } from "../paymentStore";

const ContactInfo = () => {
  const info = sPayment.slice((n) => n.info).use(); // Lấy dữ liệu từ Signify store
  const user = JSON.parse(localStorage.getItem("user")); // Parse JSON từ localStorage

  // Hàm chuyển đổi ngày sang định dạng YYYY-MM-DD
  const formatDate = (isoDate) => {
    if (!isoDate) return ""; // Trả về chuỗi rỗng nếu không có giá trị
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Thêm số 0 trước nếu cần
    const day = String(date.getDate()).padStart(2, "0"); // Thêm số 0 trước nếu cần
    return `${year}-${month}-${day}`;
  };

  const handleGetMyInfo = (event) => {
    const isChecked = event.target.checked; // Kiểm tra trạng thái checkbox
    if (isChecked && user) {
      // Nếu checkbox được chọn và user có dữ liệu
      sPayment.set((pre) => {
        pre.value.info.name = user.user_name || "";
        pre.value.info.phone = user.phone_number || "";
        pre.value.info.email = user.email || "";
        pre.value.info.dob = formatDate(user.date_of_birth) || ""; // Chuyển đổi ngày
      });
    } else {
      // Reset thông tin nếu checkbox không được chọn
      sPayment.set((pre) => {
        pre.value.info.name = "";
        pre.value.info.phone = "";
        pre.value.info.email = "";
        pre.value.info.dob = "";
      });
    }
  };

  const handleOnChangeInput = (event, field) => {
    const val = event.target.value;
    sPayment.set((pre) => {
      pre.value.info[field] = val; // Cập nhật giá trị trong Signify store
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <label>
          <input
            type="checkbox"
            onChange={handleGetMyInfo} // Gọi hàm khi trạng thái checkbox thay đổi
            className="mr-2"
          />
          Lấy thông tin của tôi
        </label>
      </div>
      <div>
        <label className="block font-semibold mb-2">Họ tên:</label>
        <input
          type="text"
          placeholder="Nhập họ tên"
          className="w-full border rounded-lg p-2"
          value={info.name || ""}
          onChange={(event) => handleOnChangeInput(event, "name")} // Xử lý khi nhập dữ liệu
        />
      </div>
      <div>
        <label className="block font-semibold mb-2">Điện thoại:</label>
        <input
          type="text"
          placeholder="Nhập số điện thoại"
          className="w-full border rounded-lg p-2"
          value={info.phone || ""}
          onChange={(event) => handleOnChangeInput(event, "phone")} // Xử lý khi nhập dữ liệu
        />
      </div>
      <div>
        <label className="block font-semibold mb-2">Email:</label>
        <input
          type="email"
          placeholder="Nhập email"
          className="w-full border rounded-lg p-2"
          value={info.email || ""}
          onChange={(event) => handleOnChangeInput(event, "email")} // Xử lý khi nhập dữ liệu
        />
      </div>
      <div>
        <label className="block font-semibold mb-2">Ngày sinh:</label>
        <input
          type="date"
          className="w-full border rounded-lg p-2"
          value={info.dob || ""}
          onChange={(event) => handleOnChangeInput(event, "dob")} // Xử lý khi nhập dữ liệu
        />
      </div>
    </div>
  );
};

export default ContactInfo;
