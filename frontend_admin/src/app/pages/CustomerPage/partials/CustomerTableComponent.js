import React, { useEffect, useState } from "react";
import CustomerModal from "./CustomerModal"; // Import modal
import { toast } from "react-toastify";

export default function CustomerTableComponent({ searchQuery }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State lưu thông tin khách hàng chọn
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái của modal

  // Fetch customer data khi component mount
  const fetchCustomerData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/list_customer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const customerData = await response.json();
      console.log("Customer daaa", customerData);

      setCustomers(customerData);
    } catch (e) {
      console.error("Error:", e);
      toast.error("Có lỗi xảy ra khi lấy dữ liệu từ server!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCustomerData();
  }, []);

  // Hàm lọc khách hàng theo tên
  const filteredCustomers = searchQuery
    ? customers.filter((customer) =>
        customer.user_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : customers;

  const handleViewDetails = (customerId) => {
    const customer = customers.find((cust) => cust._id === customerId);
    console.log("view detail", customer);
    setSelectedCustomer(customer); // Lưu khách hàng chọn vào state
    setIsModalOpen(true); // Mở modal
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
      <CustomerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        customer={selectedCustomer}
      />

      {/* Table */}
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="border-b-2 bg-blue-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300">STT</th>
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
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-4 border-b border-gray-300"
                  >
                    Không tìm thấy khách hàng
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer, index) => (
                  <tr
                    key={customer._id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"} // Thay đổi màu nền xen kẽ
                  >
                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {customer.user_name}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {customer.email}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      {customer.phone_number}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      {new Date(customer.date_of_birth).toLocaleDateString(
                        "vi-VN"
                      )}
                    </td>

                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      <button
                        onClick={() => handleViewDetails(customer._id)}
                        className="px-4 py-2 rounded "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M2 10h5m-5 7h5M2 3h17m.6 15.6L22 21m-1.2-6.6a5.4 5.4 0 1 0-10.8 0a5.4 5.4 0 0 0 10.8 0"
                            color="currentColor"
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
