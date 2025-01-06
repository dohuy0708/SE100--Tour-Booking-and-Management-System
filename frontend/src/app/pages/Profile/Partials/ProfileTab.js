import React, { useState } from "react";
import {
  UserIcon,
  KeyIcon,
  ShoppingCartIcon,
  ArrowLeftOnRectangleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function ProfileTab({ selectedTab, setSelectedTab }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Quản lý trạng thái modal
  const navigate = useNavigate();

  const tabs = [
    {
      key: "profile",
      label: "Hồ sơ",
      icon: <UserIcon className="h-6 w-6 mr-3" />,
    },
    {
      key: "bookings",
      label: "Đặt chỗ của tôi",
      icon: <ShoppingCartIcon className="h-6 w-6 mr-3" />,
    },
    {
      key: "tours",
      label: "Tour đã đi",
      icon: <PaperAirplaneIcon className="h-6 w-6 mr-3" />,
    },
    {
      key: "changePassword",
      label: "Đổi mật khẩu",
      icon: <KeyIcon className="h-6 w-6 mr-3" />,
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3" />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    window.dispatchEvent(new Event("userLogout"));
    navigate("/");
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 p-6 border-b">
          Hồ Sơ Của Tôi
        </h2>
        <ul className="space-y-2 mt-4">
          {tabs.map((tab) => (
            <li
              key={tab.key}
              onClick={() => {
                if (tab.key === "logout") {
                  setShowLogoutModal(true); // Hiện modal khi nhấn Đăng xuất
                } else {
                  setSelectedTab(tab.key);
                }
              }}
              className={`flex items-center px-5 py-4 mx-2 rounded-lg cursor-pointer transition-all duration-200 
                ${
                  selectedTab === tab.key
                    ? "bg-main text-white font-semibold shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm"
                }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal xác nhận đăng xuất */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Xác nhận đăng xuất
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogout();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
