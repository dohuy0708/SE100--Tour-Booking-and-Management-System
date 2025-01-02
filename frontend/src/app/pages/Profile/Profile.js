import React, { useEffect, useState } from "react";
import MyProfile from "./Partials/MyProfile";
import MyBookings from "./Partials/MyBookings";
import ChangePassword from "./Partials/ChangePassword";
import ProfileTab from "./Partials/ProfileTab";

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
  });

  const renderContent = () => {
    switch (selectedTab) {
      case "profile":
        return <MyProfile userData={userData} />;
      case "bookings":
        return <MyBookings />;
      case "changePassword":
        return <ChangePassword email={userData.email} />;
      default:
        return <MyProfile userData={userData} />;
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  }

  return (
    <div className="min-h-mincontent bg-gray-50">
      <div className="mx-auto max-w-7xl p-4 grid grid-cols-4 gap-2">
        {/* Sidebar */}
        <div className="col-span-1">
          <ProfileTab
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 col-span-3">{renderContent()}</div>
      </div>
    </div>
  );
}
