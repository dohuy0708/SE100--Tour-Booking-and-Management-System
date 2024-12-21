import React from "react";
import {
  UserIcon,
  KeyIcon,
  ShoppingCartIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function ProfileTab({ selectedTab, setSelectedTab }) {
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng trang

  const tabs = [
    {
      key: "profile",
      label: "Hồ sơ",
      icon: <UserIcon className="h-5 w-5 mr-2" />,
    },
    {
      key: "bookings",
      label: "Đặt chỗ của tôi",
      icon: <ShoppingCartIcon className="h-5 w-5 mr-2" />,
    },
    {
      key: "changePassword",
      label: "Đổi Mật Khẩu",
      icon: <KeyIcon className="h-5 w-5 mr-2" />,
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <ArrowLeftEndOnRectangleIcon className="h-5 w-5 mr-2" />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    // Dispatch một custom event khi đăng xuất
    window.dispatchEvent(new Event("userLogout"));
    navigate("/");
  };
  return (
    <div className="w-1/4 bg-white">
      <div>
        <h2 className="text-xl text-gray-600 font-bold p-4 border-b">
          Hồ Sơ Của Tôi
        </h2>
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab.key}
              onClick={() => {
                if (tab.key === "logout") {
                  handleLogout();
                } else {
                  setSelectedTab(tab.key);
                }
              }}
              className={`flex items-center text-gray-700 py-3 px-4 border-b border-gray-300 bg-gray-200 hover:text-main hover:bg-gray-50 cursor-pointer ${
                selectedTab === tab.key ? "font-bold text-main bg-gray-50" : ""
              }`}
            >
              {tab.icon}
              {tab.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
