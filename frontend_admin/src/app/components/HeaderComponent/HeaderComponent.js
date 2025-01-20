import React, { useState, useRef, useEffect } from "react";
import Image from "../../../mocks/img/UserImage.png";
import { useAuth } from "../../context/AuthContext"; // Đường dẫn tùy vào dự án của bạn
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function HeaderComponent() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Khai báo useNavigate
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn đăng xuất không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#3085d6", // Màu cho nút xác nhận

      reverseButtons: true, // Đổi vị trí nút xác nhận và hủy
    }).then((result) => {
      if (result.isConfirmed) {
        logout(); // Gọi hàm logout từ context
        setIsDropdownOpen(false); // Đóng menu
      }
    });
  };

  const handleChangePassword = () => {
    navigate("/reset_password"); // Điều hướng đến /resetpass
    setIsDropdownOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow dark:bg-boxdark">
      <div className="flex items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        {/* Sidebar toggle button */}
        <button
          aria-controls="sidebar"
          className="z-50 block rounded border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
        >
          <span className="block h-5.5 w-5.5">
            {/* Add toggle icon code here */}
          </span>
        </button>

        {/* Search bar (optional) */}
        <div className="hidden sm:block"></div>

        {/* User profile */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          <div className="hidden text-right lg:block">
            <span className="block text-sm font-medium text-black dark:text-white">
              {user?.user_name || "Guest"}
            </span>
            <span className="block text-xs text-gray-500">
              {user?.role || "N/A"}
            </span>
          </div>
          <div className="h-12 w-12 rounded-full flex items-center justify-center relative">
            {/* Nút Avatar */}
            <button onClick={toggleDropdown} className="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-10 w-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                style={{ top: "100%" }} // Đảm bảo dropdown xuất hiện phía dưới
              >
                <ul className="py-1">
                  <li>
                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-blue-500 hover:bg-gray-100 transition-colors duration-200"
                      onClick={handleChangePassword}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                        />
                      </svg>
                      Đổi mật khẩu
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100 transition-colors duration-200"
                      onClick={handleLogout}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                        />
                      </svg>
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
