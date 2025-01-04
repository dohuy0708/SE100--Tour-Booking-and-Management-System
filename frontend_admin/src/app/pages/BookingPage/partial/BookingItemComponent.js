import { useState } from "react";
import EditBookingModal from "./EditBookingModal";

export default function BookingItemComponent({ booking, refreshData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const handleEdit = (id) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  console.log("price", booking.total_price);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };
  return (
    <div className="flex items-center p-4 bg-white rounded-md shadow-md">
      {/* Tour Image */}
      <div className="w-32 h-24 mr-4">
        <img
          src={`http://localhost:8080${booking?.schedule_id?.tour_image}`}
          alt={"ảnh đơn đặt"}
          className="object-cover w-full h-full rounded-md"
        />
      </div>

      {/* Tour Info */}
      <div className="flex flex-1 ">
        <div className="flex-1 ">
          <p className="font-bold text-blue-500">
            Mã đặt chỗ: {booking.schedule_code}
          </p>
          <p className="font-medium">{booking.tour_name}</p>
          <p className="text-sm text-gray-600">
            Ngày khởi hành:{" "}
            {new Date(booking.schedule_date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            Mã tour: {booking?.tour_details?.tour_code || "11"}
          </p>
        </div>

        {/* Customer Info */}
        <div className="flex-1 space-y-1">
          <p className="font-medium">
            Tên khách: {booking.customer_id.user_name}
          </p>
          <p className="text-sm text-gray-600">
            SĐT: {booking.customer_id.phone_number}
          </p>
          <p className="text-sm text-gray-600">
            Email: {booking.customer_id.email}
          </p>
        </div>

        {/* Booking Info */}
        <div className="mr-4 w-34 space-y-1 ">
          <p className="font-bold text-red-500">
            {parseFloat(booking.total_price.$numberDecimal).toLocaleString()}{" "}
            VND
          </p>
          <p className="text-sm text-gray-600">
            Ngày đặt:
            {new Date(booking.booking_date).toLocaleDateString()}
          </p>
          <p
            className={`px-2 py-1 w-fit text-sm font-medium rounded-md   ${
              booking.status === "CHỜ XÁC NHẬN"
                ? "bg-purple-100 text-purple-600"
                : booking.status === "ĐÃ XÁC NHẬN"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {booking.status}
          </p>
        </div>

        {/* Button Edit */}
        <div className="flex items-center w-34">
          <button
            onClick={() => handleEdit(booking)}
            className="px-4 py-2 ml-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21 12a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1m-15 .76V17a1 1 0 0 0 1 1h4.24a1 1 0 0 0 .71-.29l6.92-6.93L21.71 8a1 1 0 0 0 0-1.42l-4.24-4.29a1 1 0 0 0-1.42 0l-2.82 2.83l-6.94 6.93a1 1 0 0 0-.29.71m10.76-8.35l2.83 2.83l-1.42 1.42l-2.83-2.83ZM8 13.17l5.93-5.93l2.83 2.83L10.83 16H8Z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Edit Booking Modal */}
      <EditBookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        Booking={selectedBooking}
        refreshData={refreshData}
      />
    </div>
  );
}
