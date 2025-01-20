import { faLuggageCart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function CustomerModal({ isOpen, onClose, customer }) {
  // Kiểm tra nếu modal không mở

  const [ListBooking, setListBooking] = useState([{}]);
  // xử lý feach data từ server .
  // Fetch customer data khi component mount
  const fetchCustomerData = async () => {
    console.log(" model customer", customer);
    try {
      const response = await fetch(
        `http://localhost:8080/bookings/customer/${customer._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const listbooking = await response.json();
      console.log("List booking", listbooking);
      setListBooking(listbooking);
    } catch (e) {
      console.error("Error:", e);
      //alert("Có lỗi xảy ra khi lấy dữ liệu từ server!");
    } finally {
    }
  };
  useEffect(() => {
    fetchCustomerData();
  }, [customer]);
  if (!isOpen) return null; // Không render nếu modal không được mở
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center pt-8 place-items-start z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 p-6 flex flex-col max-h-[70vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b mb-4">
          <h1 className="text-2xl font-semibold">THÔNG TIN KHÁCH HÀNG</h1>
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
              className="size-6"
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
          {/* Customer Information */}
          <div className="mb-4">
            <h4 className="font-semibold text-xl text-blue-500 mb-2">
              Thông tin khách hàng
            </h4>
            <div className="grid grid-cols-2 gap-4 border border-gray-300 rounded-lg p-2 bg-slate-50">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Họ tên</label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded"
                  placeholder="Họ tên"
                  value={customer?.user_name}
                  readOnly
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Số điện thoại</label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded"
                  placeholder="Số điện thoại"
                  value={customer?.phone_number}
                  readOnly
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="mt-1 p-2 border rounded"
                  placeholder="Email"
                  value={customer?.email}
                  readOnly
                />
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Ngày sinh</label>
                <input
                  type="String"
                  className="mt-1 p-2 border rounded"
                  value={new Date(customer?.date_of_birth).toLocaleDateString()}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Customer Tour Information */}
          {ListBooking && ListBooking?.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-xl text-blue-500 mb-2">
                Thông tin tour đã đặt
              </h4>

              {/* Total number of tours */}
              <div className="mb-2">
                <strong>Tổng số tour đã đặt:</strong> {ListBooking?.length}
              </div>

              {/* List of tours */}
              {/* List of tours */}
              <div className="grid grid-cols-2 gap-4">
                {ListBooking.map((tour) => (
                  <div
                    key={tour._id}
                    className="border p-4 rounded-lg bg-gray-50"
                  >
                    <div className="font-semibold text-lg">
                      <div>
                        <label className="font-semibold">Tên tour:</label>{" "}
                        <span className="font-light">
                          {tour.schedule_id?.tour_id?.tour_name}
                        </span>
                      </div>
                      <div>
                        <label className="font-semibold">Mã chuyến đi:</label>{" "}
                        <span className="font-light">
                          {tour.schedule_id?.tour_id?.tour_code}
                        </span>
                      </div>
                      <div>
                        <label className="font-semibold">Ngày đặt:</label>{" "}
                        <span className="font-light">
                          {new Date(tour?.booking_date).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <label className="font-semibold">Ngày đi:</label>{" "}
                        <span className="font-light">
                          {new Date(
                            tour?.schedule_id?.departure_date
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <label className="font-semibold">Giá tiền:</label>{" "}
                        <span className="font-light">
                          {parseFloat(
                            tour?.total_price?.$numberDecimal
                          ).toLocaleString()}{" "}
                          VND
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
