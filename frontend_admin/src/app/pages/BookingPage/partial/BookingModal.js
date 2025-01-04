import React, { useState } from "react";
import { useFilterContext } from "../../../context/FilterContext.js";
import Swal from "sweetalert2";
const customerTypes = ["Người lớn", "Trẻ em", "Em bé"];

export default function BookingModal({ isOpen, onClose, refreshData }) {
  const { tourData } = useFilterContext(); // Lấy dữ liệu từ context

  // Kiểm tra tourData có được lấy không
  console.log("Tour Data Modal:", tourData);

  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    dob: "",
  });
  const [bookingInfo, setBookingInfo] = useState({
    ticketQuantity: 1,
    customers: [
      {
        type: "",
        fullName: "",
        gender: "",
        dob: "",
        id: "",
        price: 0,
      },
    ],
    totalPrice: 0,
  });

  const handleTicketQuantityChange = (e) => {
    const quantity = e.target.value;
    const newCustomers = Array.from({ length: quantity }, () => ({
      type: "",
      fullName: "",
      gender: "",
      dob: "",
      id: "",
      price: 0,
    }));

    setBookingInfo((prev) => ({
      ...prev,
      ticketQuantity: quantity,
      customers: newCustomers,
    }));
  };

  const handleTourChange = (e) => {
    const tour = tourData.find((t) => t._id === e.target.value);
    setSelectedTour(tour);
    setSelectedStartDate(""); // Reset ngày khởi hành khi thay đổi tour
    // Reset lại thông tin đặt vé và số lượng vé về 1
    setBookingInfo({
      ticketQuantity: 1,
      customers: [
        {
          type: "",
          fullName: "",
          gender: "",
          dob: "",
          id: "",
          price: 0,
        },
      ],
      totalPrice: 0,
    });
  };
  const handleCustomerChange = (index, field, value) => {
    setBookingInfo((prev) => {
      const updatedCustomers = [...prev.customers];
      updatedCustomers[index] = {
        ...updatedCustomers[index],
        [field]: value,
      };

      // Cập nhật giá vé nếu field là loại khách
      if (field === "type") {
        updatedCustomers[index].price =
          value === "Người lớn"
            ? parseFloat(
                selectedTour?.tourPrice?.adult_price?.$numberDecimal || 0
              )
            : value === "Trẻ em"
            ? parseFloat(
                selectedTour?.tourPrice?.children_price?.$numberDecimal || 0
              )
            : value === "Em bé"
            ? parseFloat(
                selectedTour?.tourPrice?.infant_price?.$numberDecimal || 0
              )
            : 0;
      }

      return {
        ...prev,
        customers: updatedCustomers,
      };
    });
  };

  const calculateTotal = () => {
    return bookingInfo.customers.reduce(
      (total, customer) => total + customer.price,
      0
    );
  };
  const handleSubmitBooking = async () => {
    // Kiểm tra thông tin khách hàng
    const isCustomerInfoValid =
      customerInfo.fullName.trim() &&
      customerInfo.phone.trim() &&
      customerInfo.email.trim() &&
      customerInfo.dob.trim();

    // Kiểm tra thông tin tour và ngày khởi hành
    const isTourInfoValid = selectedTour && selectedStartDate;

    // Kiểm tra danh sách khách hàng
    const areCustomersValid = bookingInfo.customers.every(
      (customer) =>
        customer.type.trim() &&
        customer.fullName.trim() &&
        customer.gender.trim() &&
        customer.dob.trim() &&
        customer.id.trim()
    );

    // Nếu bất kỳ điều kiện nào không hợp lệ
    if (!isCustomerInfoValid || !isTourInfoValid || !areCustomersValid) {
      Swal.fire({
        icon: "info",
        title: "Vui lòng nhập đầy đủ thông tin",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    // Chuẩn bị dữ liệu gửi đến backend
    const bookingData = {
      stt: "CHỜ XÁC NHẬN",
      method: "CASH",
      name: customerInfo.fullName,
      phone: customerInfo.phone,
      mail: customerInfo.email,
      dob: customerInfo.dob, // Thêm giá trị mặc định nếu cần
      schedule: selectedStartDate,
      date: new Date().toISOString().split("T")[0], // Ngày hiện tại
      price: calculateTotal(),
      number_slot: bookingInfo.ticketQuantity,
      passengers: bookingInfo.customers.map((customer) => ({
        name: customer.fullName,
        date: customer.dob,
        type:
          customer.type === "Người lớn"
            ? "ADULT"
            : customer.type === "Trẻ em"
            ? "CHILD"
            : customer.type === "Em bé"
            ? "INFANT"
            : "", // Giá trị mặc định nếu không khớp
        passport: customer.id, // Giả sử 'id' là số hộ chiếu
      })),
    };

    console.log("Dữ liệu gửi đến backend:", bookingData);

    // Gửi dữ liệu đến server
    try {
      const response = await fetch("http://localhost:8080/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Thêm đơn đặt thành công",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          setSelectedTour(null);
          setSelectedStartDate("");
          setCustomerInfo({
            fullName: "",
            phone: "",
            email: "",
            dob: "",
          });
          setBookingInfo({
            ticketQuantity: 1,
            customers: [
              {
                type: "",
                fullName: "",
                gender: "",
                dob: "",
                id: "",
                price: 0,
              },
            ],
            totalPrice: 0,
          });
          refreshData();
          onClose(); // Đóng modal
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Thêm đơn đặt thất bại",
          text: "Vui lòng thử lại sau!",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      Swal.fire({
        icon: "error",
        title: "Thêm đơn đặt thất bại",
        text: "Vui lòng thử lại sau!",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center pt-8 place-items-start z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 p-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b mb-4">
          <h1 className="text-2xl font-semibold">Đặt tour</h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          className="overflow-auto flex-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Tour Info */}
          <div className="mb-4">
            <h4 className="text-xl text-blue-500 font-semibold mb-2">
              Thông tin tour
            </h4>
            <div className="flex border border-gray-300 rounded-lg p-2 bg-slate-50 gap-4">
              {/* Tour Selection */}
              <div className="flex-grow-[6] basis-[60%]">
                <h4 className="font-semibold">Chọn tour:</h4>
                <select
                  className="mt-2 w-full p-2 border rounded"
                  value={selectedTour ? selectedTour._id : ""}
                  onChange={handleTourChange}
                >
                  <option value="">Chọn tour</option>
                  {tourData.map((tour) => (
                    <option key={tour._id} value={tour._id}>
                      {tour.tour_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date Selection */}
              <div className="flex-grow-[2] basis-[20%]">
                <h4 className="font-semibold">Chọn ngày:</h4>
                <select
                  className="mt-2 w-full p-2 border rounded"
                  value={selectedStartDate}
                  onChange={(e) => setSelectedStartDate(e.target.value)}
                >
                  <option value="">Chọn ngày</option>
                  {selectedTour?.tourSchedules.map((schedule, idx) => (
                    <option key={schedule._id} value={schedule._id}>
                      {new Date(schedule.departure_date).toLocaleDateString(
                        "vi-VN"
                      )}{" "}
                      {/* Chỉ lấy ngày */}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ticket Quantity */}
              <div className="flex-grow-[1] basis-[10%]">
                <h4 className="font-semibold">Số lượng vé:</h4>
                <input
                  type="number"
                  className="mt-2 w-full p-2 border rounded"
                  placeholder="Số vé"
                  value={bookingInfo.ticketQuantity}
                  onChange={handleTicketQuantityChange}
                  min={1}
                  disabled={selectedTour === null} // Chỉ cho phép thay đổi khi tour đã được chọn
                />
              </div>
            </div>
          </div>
          {/* Customer Information */}
          <div className="mb-4 ">
            <h4 className="font-semibold text-xl text-blue-500 mb-2">
              Thông tin người đặt tour
            </h4>
            <div className="grid grid-cols-2 gap-4   border border-gray-300 rounded-lg p-2 bg-slate-50">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Họ tên</label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded"
                  placeholder="Họ tên"
                  value={customerInfo.fullName}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      fullName: e.target.value,
                    })
                  }
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Số điện thoại</label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded"
                  placeholder="Số điện thoại"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="mt-1 p-2 border rounded"
                  placeholder="Email"
                  value={customerInfo.email}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, email: e.target.value })
                  }
                />
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Ngày sinh</label>
                <input
                  type="date"
                  className="mt-1 p-2 border rounded"
                  value={customerInfo.dob}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, dob: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          {/* Booking Information */}
          <div className="mb-4">
            <h4 className="font-semibold text-blue-500 text-xl">
              Thông tin đặt khách hàng
            </h4>
            <div className="mb-4  border border-gray-300 rounded-lg p-2 bg-slate-50">
              {bookingInfo.customers.map((customer, index) => (
                <div key={index} className="mb-4 ">
                  <h5 className="font-semibold">Khách {index + 1}</h5>
                  <div className="flex space-x-4 w-full border border-gray-300 rounded-lg p-2">
                    {/* Customer Type */}
                    <div className="w-1/4">
                      <label className="font-medium">Loại khách</label>
                      <select
                        className="mt-2 w-full p-2 border rounded"
                        name="type"
                        value={customer.type}
                        onChange={(e) =>
                          handleCustomerChange(index, "type", e.target.value)
                        } // Truyền field và value
                      >
                        <option value="">Chọn loại khách</option>
                        {customerTypes.map((type, idx) => (
                          <option key={idx} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Full Name */}
                    <div className="w-1/2">
                      <label className="font-medium">Họ tên</label>
                      <input
                        type="text"
                        className="mt-2 w-full p-2 border rounded"
                        placeholder="Họ tên"
                        name="fullName"
                        value={customer.fullName}
                        onChange={(e) =>
                          handleCustomerChange(
                            index,
                            "fullName",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    {/* Gender */}
                    <div className="w-1/4">
                      <label className="font-medium">Giới tính</label>
                      <select
                        className="mt-2 w-full p-2 border rounded"
                        name="gender"
                        value={customer.gender}
                        onChange={(e) =>
                          handleCustomerChange(index, "gender", e.target.value)
                        }
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                      </select>
                    </div>

                    {/* Date of Birth */}
                    <div className="w-1/4">
                      <label className="font-medium">Ngày sinh</label>
                      <input
                        type="date"
                        className="mt-2 w-full p-2 border rounded"
                        name="dob"
                        value={customer.dob}
                        onChange={(e) =>
                          handleCustomerChange(index, "dob", e.target.value)
                        }
                      />
                    </div>

                    {/* CCCD */}
                    <div className="w-1/2">
                      <label className="font-medium">Số định danh</label>
                      <input
                        type="number"
                        className="mt-2 w-full p-2 border rounded"
                        placeholder="CCCD/Số định danh"
                        name="id"
                        value={customer.id}
                        onChange={(e) =>
                          handleCustomerChange(index, "id", e.target.value)
                        }
                      />
                    </div>
                    {/* Ticket Price */}
                    <div className="w-1/4">
                      <label className="font-medium">Giá vé</label>
                      <input
                        type="text"
                        className="mt-2 w-full p-2 border rounded text-yellow-500"
                        value={`${customer.price.toLocaleString()} VND`} // Giá vé có thể được tính toán hoặc lấy từ một biến
                        disabled
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Order Information */}
          <div className="mb-4">
            <h4 className="text-xl text-blue-500  font-semibold mb-2">
              Thông tin đơn hàng
            </h4>
            <div className="flex   border border-gray-300 rounded-lg p-2 bg-slate-50  gap-4">
              <div className="w-full">
                <h5 className="font-semibold">Tổng cộng</h5>
                <div className="font-bold text-2xl text-yellow-500">
                  {calculateTotal().toLocaleString()} VND
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-500 text-white rounded-md"
            >
              Hủy
            </button>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleSubmitBooking}
            >
              Đặt tour
            </button>
          </div>
          {/* Booking Details */}
        </div>
      </div>
    </div>
  );
}
