import React, { useEffect, useState } from "react";
import { getCustomerData } from "../../../services/Customer_with_TourService";
import StaffModal from "./StaffModal";

export default function StaffTableComponent({ searchQuery }) {
  const [Staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State lưu thông tin khách hàng chọn
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái của modal

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const Staff = await getCustomerData(); // Nhận dữ liệu khách hàng từ service
        setStaff(Staff);
        setLoading(false);
      } catch (error) {
        console.error("Error loading customer data:", error);
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  // Hàm lọc khách hàng theo tên
  const filteredStaff = searchQuery
    ? Staff.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : Staff;

  const handleViewDetails = (customerId) => {
    const customer = Staff.find((cust) => cust.id === customerId);
    setSelectedCustomer(customer); // Lưu khách hàng chọn vào state
    setIsModalOpen(true); // Mở modal
  };
  const handleDelete = (userId) => {
    console.log("Xóa nhân viên với userId:", userId);
    // Logic xóa nhân viên tại đây
    setIsModalOpen(false); // Đóng modal sau khi xóa
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // Đóng modal
    setSelectedCustomer(null); // Reset thông tin khách hàng khi đóng modal
  };

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi dữ liệu đang tải
  }

  return (
    <div>
      {/* Modal */}
      <StaffModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        staff={selectedCustomer}
        onDelete={handleDelete}
      />
      {/* Table */}
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="border-b-2 bg-blue-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300">ID</th>
                <th className="px-4 py-2 border-b border-gray-300">Tên</th>
                <th className="px-4 py-2 border-b border-gray-300">Email</th>
                <th className="px-4 py-2 border-b border-gray-300">SDT</th>
                <th className="px-4 py-2 border-b border-gray-300">
                  Ngày sinh
                </th>

                <th className="px-4 py-2 border-b border-gray-300"> </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredStaff.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-4 border-b border-gray-300"
                  >
                    Không tìm thấy khách hàng
                  </td>
                </tr>
              ) : (
                filteredStaff.map((customer, index) => (
                  <tr
                    key={customer.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"} // Thay đổi màu nền xen kẽ
                  >
                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      {customer.id}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {customer.name}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {customer.email}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      {customer.phone}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      {customer.birthday}
                    </td>

                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      <button
                        onClick={() => handleViewDetails(customer.id)}
                        className="px-4 py-2 rounded "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="red"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
