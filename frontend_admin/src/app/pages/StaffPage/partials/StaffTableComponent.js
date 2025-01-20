import React, { useEffect, useState } from "react";
import StaffModal from "./StaffModal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifySuccess } from "../../../components/Notification";

export default function StaffTableComponent({ searchQuery }) {
  const [Staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/list_staff", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const staffData = await response.json();
        setStaff(staffData);
      } catch (e) {
        console.error("Error:", e);
        toast.error("Có lỗi xảy ra khi lấy dữ liệu từ server!");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  const filteredStaff = searchQuery
    ? Staff.filter((staff) =>
        staff.user_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : Staff;

  const handleViewDetails = (staffId) => {
    const staff = Staff.find((s) => s._id === staffId);
    setSelectedCustomer(staff);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      // Gửi yêu cầu xóa đến server
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Gửi cookie nếu cần
      });

      // Kiểm tra phản hồi từ server
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Lỗi không xác định khi xóa nhân viên"
        );
      }
      setStaff((prevStaff) =>
        prevStaff.filter((staff) => staff._id !== userId)
      );
      notifySuccess("Xóa nhân viên thàng công");
    } catch (error) {
      console.error("Lỗi khi xóa nhân viên:", error);
      notifyError("Lỗi khi xóa nhân viên!");
    } finally {
      setIsModalOpen(false); // Đóng modal sau khi xử lý
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-mincontent py-6">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
        <span className="ml-4 text-lg text-gray-700">Đang tải...</span>
      </div>
    );
  }

  return (
    <div>
      <StaffModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        staff={selectedCustomer}
        onDelete={handleDelete}
      />
      <div>
        <ToastContainer />
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
              {filteredStaff.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-4 border-b border-gray-300"
                  >
                    Không tìm thấy nhân viên
                  </td>
                </tr>
              ) : (
                filteredStaff.map((staff, index) => (
                  <tr
                    key={staff._id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {staff.user_name}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {staff.email}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      {staff.phone_number}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      {new Date(staff.date_of_birth).toLocaleDateString(
                        "vi-VN"
                      )}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 text-center">
                      <button
                        onClick={() => handleViewDetails(staff._id)}
                        className="px-4 py-2 rounded"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="red"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
