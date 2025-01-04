export default function CustomerModal({ isOpen, onClose, customerId }) {
  // Kiểm tra nếu modal không mở
  if (!isOpen) return null;

  // Dữ liệu ảo
  const customer = {
    id: 4,
    name: "Pham Minh D",
    email: "minhd@example.com",
    phone: "0934123456",
    birthday: "10-08-1987",
    listTour: [
      {
        bookingId: 6,
        schedule: {
          scheduleId: 6,
          departureDate: "2025-02-01",
          tour: {
            tourId: 6,
            tourName: "Da Nang - Ba Na Hills - My Khe Beach",
          },
        },
        bookingDate: "2024-12-15",
        totalPrice: 10800000,
      },
      {
        bookingId: 7,
        schedule: {
          scheduleId: 7,
          departureDate: "2025-03-01",
          tour: {
            tourId: 7,
            tourName: "Hue Ancient Citadel Tour",
          },
        },
        bookingDate: "2024-12-20",
        totalPrice: 7500000,
      },
    ],
  };

  // xử lý feach data từ server .

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
                  value={customer.name}
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
                  value={customer.phone}
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
                  value={customer.email}
                  readOnly
                />
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Ngày sinh</label>
                <input
                  type="date"
                  className="mt-1 p-2 border rounded"
                  value={customer.birthday}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Customer Tour Information */}
          {customer?.listTour && customer.listTour.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-xl text-blue-500 mb-2">
                Thông tin tour đã đặt
              </h4>

              {/* Total number of tours */}
              <div className="mb-2">
                <strong>Tổng số tour đã đặt:</strong> {customer.listTour.length}
              </div>

              {/* List of tours */}
              {/* List of tours */}
              <div className="grid grid-cols-2 gap-4">
                {customer.listTour.map((tour) => (
                  <div
                    key={tour.bookingId}
                    className="border p-4 rounded-lg bg-gray-50"
                  >
                    <div className="font-semibold text-lg">
                      <div>
                        <label className="font-semibold">Tên tour:</label>{" "}
                        <span className="font-light">
                          {tour.schedule.tour.tourName}
                        </span>
                      </div>
                      <div>
                        <label className="font-semibold">Mã chuyến đi:</label>{" "}
                        <span className="font-light">{tour.bookingId}</span>
                      </div>
                      <div>
                        <label className="font-semibold">Ngày đặt:</label>{" "}
                        <span className="font-light">
                          {new Date(tour.bookingDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <label className="font-semibold">Ngày đi:</label>{" "}
                        <span className="font-light">
                          {new Date(
                            tour.schedule.departureDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <label className="font-semibold">Giá tiền:</label>{" "}
                        <span className="font-light">
                          {tour.totalPrice.toLocaleString()} VND
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
