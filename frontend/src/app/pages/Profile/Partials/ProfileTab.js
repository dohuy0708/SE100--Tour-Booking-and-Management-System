import React from "react";
import {
  UserIcon,
  KeyIcon,
  ShoppingCartIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function ProfileTab({ selectedTab, setSelectedTab }) {
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
    <div className=" bg-white rounded-lg shadow-md ">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 p-6 border-b ">
          Hồ Sơ Của Tôi
        </h2>
        <ul className="space-y-2 mt-4">
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
    </div>
  );
}
