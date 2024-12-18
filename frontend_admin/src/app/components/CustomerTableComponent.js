// File: components/CustomerTableComponent.js
import React, { useEffect, useState } from "react";
import { getCustomerData } from "../pages/CustomerPage/services/getCustomerService";

export default function CustomerTableComponent({ searchQuery }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch customer data khi component mount
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const { customers } = await getCustomerData(); // Nhận dữ liệu khách hàng từ service
        setCustomers(customers);
        setLoading(false);
      } catch (error) {
        console.error("Error loading customer data:", error);
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  // Hàm lọc khách hàng theo tên
  const filteredCustomers = searchQuery
    ? customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : customers;

  const handleViewDetails = (customerId) => {
    console.log(`Xem chi tiết thông tin của khách hàng với ID: ${customerId}`);
    // Logic xem chi tiết thông tin khách hàng
    // Có thể mở modal hoặc điều hướng tới trang chi tiết
  };

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi dữ liệu đang tải
  }

  return (
    <div>
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
                <th className="px-4 py-2 border-b border-gray-300">
                  Tour đã đặt
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
                    key={customer.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"} // Thay đổi màu nền xen kẽ
                  >
                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      {customer.id}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300  ">
                      {customer.name}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300  ">
                      {customer.email}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      {customer.phone}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      {customer.birthday}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      {customer.total_bookings}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      <button
                        onClick={() => handleViewDetails(customer.id)}
                        className="px-4 py-2   rounded "
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
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
