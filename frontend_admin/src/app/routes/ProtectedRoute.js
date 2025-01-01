import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user } = useAuth(); // Lấy thông tin người dùng từ AuthContext

  if (!user) {
    // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    return <Navigate to="/login" />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    // Nếu người dùng không có quyền truy cập
    return <Navigate to="/unauthorized" />; // Hoặc chuyển đến trang thông báo lỗi
  }

  return children; // Cho phép truy cập nếu đã đăng nhập và có quyền
};

export default ProtectedRoute;
