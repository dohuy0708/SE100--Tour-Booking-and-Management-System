import React, { useEffect, useState, useRef } from "react";
import {
  UserCircleIcon,
  UserIcon,
  ChevronDownIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";

export default function HeaderComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Thêm ref để theo dõi dropdown

  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem("user_id");
      setIsLoggedIn(!!user);
    };

    checkLoginStatus();

    const handleUserLogout = () => {
      setIsLoggedIn(false);
      setDropdownOpen(false);
    };

    window.addEventListener("userLogout", handleUserLogout);

    return () => {
      window.removeEventListener("userLogout", handleUserLogout);
    };
  }, []);

  // Đóng dropdown khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="h-hheader flex-1 items-center bg-main">
      <div className="max-w-7xl h-full mx-auto">
        <div className="flex justify-between h-full items-center">
          {/* Logo */}
          <div>
            <img
              className="h-10 ml-3 mt-1 mb-[-4px] text-white"
              src="/logo.png"
              alt="logo kaze"
            />
          </div>

          {/* Menu */}
          <div className="h-full flex">
            {!isLoggedIn ? (
              <>
                <NavLink
                  to={"/signup"}
                  className="border-l-[1px] h-full flex items-center border-white pl-4 pr-6 text-white hover:bg-white/10 transition-colors"
                >
                  <UserCircleIcon className="h-7 mr-2" />
                  <div>Đăng ký</div>
                </NavLink>
                <NavLink
                  to={"/login"}
                  className="border-l-[1px] h-full flex items-center border-white pl-4 pr-6 text-white hover:bg-white/10 transition-colors"
                >
                  <UserCircleIcon className="h-7 mr-2" />
                  <div>Đăng nhập</div>
                </NavLink>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="border-l-[1px] h-full flex items-center border-white pl-4 pr-6 text-white hover:bg-white/10 transition-colors"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <UserCircleIcon className="h-7 mr-2" />
                  <span>Tài khoản</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 ml-2 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute z-30 right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100 transition-all duration-200">
                    <div className="py-1">
                      <button
                        className="group flex w-full items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                          navigate("/profile");
                          setDropdownOpen(false);
                        }}
                      >
                        <UserIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                        <span className="flex-1 text-left">Tài khoản</span>
                      </button>

                      <button
                        className="group flex w-full items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
                        onClick={handleLogout}
                      >
                        <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                        <span className="flex-1 text-left">Đăng xuất</span>
                      </button>
                    </div>
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
