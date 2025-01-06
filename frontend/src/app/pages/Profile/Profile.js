import React, { useEffect, useState } from "react";
import MyProfile from "./Partials/MyProfile";
import MyBookings from "./Partials/MyBookings";
import ChangePassword from "./Partials/ChangePassword";
import ProfileTab from "./Partials/ProfileTab";
import MyTours from "./Partials/MyTours";
import { ToastContainer, toast } from "react-toastify";

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // Thêm state để lưu thông tin người dùng

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("store: ", JSON.parse(storedUser));
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser)); // Parse JSON để lấy dữ liệu người dùng
      } catch (error) {
        console.error("Lỗi khi parse dữ liệu người dùng:", error);
      }
    }
    setLoading(false);
  }, [selectedTab]);

  const renderContent = () => {
    switch (selectedTab) {
      case "profile":
        return <MyProfile userData={userData} />;
      case "bookings":
        return <MyBookings />;
      case "tours":
        return <MyTours />;
      case "changePassword":
        return <ChangePassword email={userData.email} />;
      default:
        return <MyProfile userData={userData} />;
    }
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
    <div className="min-h-mincontent bg-gray-50">
      <div className="mx-auto p-4 grid grid-cols-9 gap-2">
        {/* Sidebar */}
        <div className="col-span-2">
          <ProfileTab
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 col-span-7">{renderContent()}</div>
      </div>
      <ToastContainer />
    </div>
  );
}
