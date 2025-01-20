import React from "react";
import { sPayment } from "../paymentStore";
const ContactInfo = () => {
  const info = sPayment.slice((n) => n.info).use();

  const handleOnChangeInput = (event, field) => {
    const val = event.target.value;
    sPayment.set((pre) => {
      pre.value.info[field] = val;
    });
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block font-semibold mb-2">Họ tên:</label>
        <input
          type="text"
          placeholder="Nhập họ tên"
          className="w-full border rounded-lg p-2"
          value={info.name}
          onChange={(event) => handleOnChangeInput(event, "name")}
        />
      </div>
      <div>
        <label className="block font-semibold mb-2">Điện thoại:</label>
        <input
          type="text"
          placeholder="Nhập số điện thoại"
          className="w-full border rounded-lg p-2"
          value={info.phone}
          onChange={(event) => handleOnChangeInput(event, "phone")}
        />
      </div>
      <div>
        <label className="block font-semibold mb-2">Email:</label>
        <input
          type="email"
          placeholder="Nhập email"
          className="w-full border rounded-lg p-2"
          value={info.email}
          onChange={(event) => handleOnChangeInput(event, "email")}
        />
      </div>
      <div>
        <label className="block font-semibold mb-2">Địa chỉ:</label>
        <input
          type="text"
          placeholder="Nhập địa chỉ"
          className="w-full border rounded-lg p-2"
          value={info.address}
          onChange={(event) => handleOnChangeInput(event, "address")}
        />
      </div>
    </div>
  );
};

export default ContactInfo;
