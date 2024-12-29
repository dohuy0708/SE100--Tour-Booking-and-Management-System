import React, { useState } from "react";

export default function Contact() {
  // State lưu trữ dữ liệu form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  // State lưu lỗi validation
  const [errors, setErrors] = useState({});

  // Hàm cập nhật dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Hàm kiểm tra validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Họ & tên không được để trống.";
    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Điện thoại không được để trống.";
    } else if (!/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải có 10-11 chữ số.";
    }
    if (!formData.address.trim())
      newErrors.address = "Địa chỉ không được để trống.";
    if (!formData.message.trim())
      newErrors.message = "Nội dung không được để trống.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về `true` nếu không có lỗi
  };

  // Hàm xử lý gửi form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Dữ liệu gửi đi:", formData);

      // Gửi dữ liệu đến API (giả lập)
      setTimeout(() => {
        alert("Thông tin đã được gửi thành công!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
      }, 500);
    }
  };
  return (
    <div className="bg-gray-100">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3  min-h-mincontent py-6 mx-32">
        {/* Thông tin liên hệ */}
        <div className=" col-span-1  w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-800">
            Công ty TNHH 5H - BANANA
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="text-main text-2xl mr-4">📍</div>
              <div>
                <p className="font-semibold text-gray-700">Địa chỉ:</p>
                <p className="text-gray-600">
                  Khu phố 6, Phường Linh Trung, Quận Thủ Đức, TP.HCM
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-main text-2xl mr-4">📞</div>
              <div>
                <p className="font-semibold text-gray-700">
                  Tư vấn & đặt dịch vụ:
                </p>
                <p className="text-gray-600">Điện thoại: (84-28) 38 279 279</p>
                <p className="text-gray-600">Hotline: 1900 1808</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-main text-2xl mr-4">✉️</div>
              <div>
                <p className="font-semibold text-gray-700">Email:</p>
                <p className="text-gray-600">uit@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Liên Hệ</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Họ và Tên */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Họ & tên"
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.name
                    ? "border-red focus:ring-red"
                    : "border-gray-300 focus:ring-main"
                }`}
              />
              {errors.name && (
                <p className="text-red text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.email
                    ? "border-red focus:ring-red"
                    : "border-gray-300 focus:ring-main"
                }`}
              />
              {errors.email && (
                <p className="text-red text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Điện thoại */}
            <div>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Điện thoại"
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.phone
                    ? "border-red focus:ring-red"
                    : "border-gray-300 focus:ring-main"
                }`}
              />
              {errors.phone && (
                <p className="text-red text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Địa chỉ */}
            <div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Địa chỉ"
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.address
                    ? "border-red focus:ring-red"
                    : "border-gray-300 focus:ring-main"
                }`}
              />
              {errors.address && (
                <p className="text-red text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* Nội dung */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Nội dung"
                rows="5"
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.message
                    ? "border-red focus:ring-red"
                    : "border-gray-300 focus:ring-main"
                }`}
              ></textarea>
              {errors.message && (
                <p className="text-red text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Nút gửi */}
            <button
              type="submit"
              className="w-full bg-main text-white font-semibold py-3 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-main focus:outline-none"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
