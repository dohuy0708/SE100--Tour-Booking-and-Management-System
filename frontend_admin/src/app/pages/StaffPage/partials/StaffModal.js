export default function StaffModal({ isOpen, onClose, staff, onDelete }) {
  // Kiểm tra nếu modal không mở
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center pt-20  place-items-start z-50">
      <div className="bg-white rounded-lg shadow-lg w-2/6 p-6 flex flex-col max-h-[70vh]  ">
        {/* Header */}
        <div className="flex justify-between items-center border-b mb-4">
          <h3 className="text-2xl font-semibold text-center w-full">
            Bạn muốn xóa nhân viên này?
          </h3>
        </div>

        {/* Staff Info */}
        <div className="mb-6 text-left items-center pl-28 ">
          <p>
            <strong>Tên: </strong>
            {staff.name}
          </p>
          <p>
            <strong>Email: </strong>
            {staff.email}
          </p>
          <p>
            <strong>Số điện thoại: </strong>
            {staff.phone}
          </p>
          <p>
            <strong>Ngày sinh: </strong>
            {staff.birthday}
          </p>
        </div>

        {/* Footer with action buttons */}
        <div className="flex justify-between gap-4 mt-6">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Hủy
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(staff.userId)} // Call the delete function with userId
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
