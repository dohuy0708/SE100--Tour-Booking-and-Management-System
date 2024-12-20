import React, { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";

export default function HeaderComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kiểm tra trạng thái đăng nhập
  const [dropdownOpen, setDropdownOpen] = useState(false); // Trạng thái mở dropdown
  const navigate = useNavigate();
  useEffect(() => {
    const id = localStorage.getItem("user");
    if (id) setIsLoggedIn(true);
  });
  const handleLogout = () => {
    setIsLoggedIn(false); // Đặt trạng thái đăng xuất
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="h-[64px] flex-1 items-center bg-main">
      <div className="max-w-7xl h-full mx-auto">
        <div className="flex justify-between h-full items-center">
          {/* Logo */}
          <div>
            <img
              className="h-16 mt-1 mb-[-4px] text-white"
              src="/logo.png"
              alt="logo kaze"
            />
          </div>

          {/* Menu */}
          <div className="h-full flex">
            {!isLoggedIn ? (
              // Hiển thị nếu chưa đăng nhập
              <>
                <NavLink
                  to={"/signup"}
                  className="border-l-[1px] h-full flex items-center border-white pl-4 pr-6 text-white"
                >
                  <UserCircleIcon className="h-8 mr-2" />
                  <div>Đăng ký</div>
                </NavLink>
                <NavLink
                  to={"/login"}
                  className="border-l-[1px] h-full flex items-center border-white pl-4 text-white"
                >
                  <UserCircleIcon className="h-8 mr-2" />
                  <div>Đăng nhập</div>
                </NavLink>
              </>
            ) : (
              // Hiển thị nếu đã đăng nhập
              <div className="relative">
                <div
                  className="border-l-[1px] h-full flex items-center cursor-pointer text-white px-4"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <UserCircleIcon className="h-8 mr-2" />
                  <div>Tài khoản</div>
                </div>
                {dropdownOpen && (
                  <div className="absolute z-30 right-0 mt-2 bg-white shadow-lg rounded-md text-gray-800">
                    <ul>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate("/account")}
                      >
                        Tài khoản
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
