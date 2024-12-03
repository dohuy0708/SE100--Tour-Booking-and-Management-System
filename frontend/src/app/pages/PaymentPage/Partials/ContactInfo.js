import React, { useState } from "react";

const ContactInfo = () => {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block font-semibold mb-2">Họ tên:</label>
        <input
          type="text"
          placeholder="Nhập họ tên"
          className="w-full border rounded-lg p-2"
          value={contactInfo.name}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, name: e.target.value })
          }
        />
      </div>
      <div>
        <label className="block font-semibold mb-2">Điện thoại:</label>
        <input
          type="text"
          placeholder="Nhập số điện thoại"
          className="w-full border rounded-lg p-2"
          value={contactInfo.phone}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, phone: e.target.value })
          }
        />
      </div>
      <div>
        <label className="block font-semibold mb-2">Email:</label>
        <input
          type="email"
          placeholder="Nhập email"
          className="w-full border rounded-lg p-2"
          value={contactInfo.email}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, email: e.target.value })
          }
        />
      </div>
      <div>
        <label className="block font-semibold mb-2">Địa chỉ:</label>
        <input
          type="text"
          placeholder="Nhập địa chỉ"
          className="w-full border rounded-lg p-2"
          value={contactInfo.address}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, address: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default ContactInfo;
