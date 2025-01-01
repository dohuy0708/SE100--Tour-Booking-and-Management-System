import HistoryPage from "../pages/HistoryPage";
import SignUp from "../pages/SignupPage";

import StaffPage from "../pages/StaffPage";
import TourPage from "../pages/TourPage";
const adminRoutes = [
  {
    path: "/Tour",
    page: TourPage,
    isShowLayout: true,
    roles: ["ADMIN"], // Chỉ admin có quyền truy cập
  },
  {
    path: "/Staff",
    page: StaffPage,
    isShowLayout: true,
    roles: ["ADMIN"], // Chỉ admin có quyền truy cập
  },
  {
    path: "/History",
    page: HistoryPage,
    isShowLayout: true,
    roles: ["ADMIN"], // Chỉ admin có quyền truy cập
  },
  {
    path: "/signup",
    page: SignUp,
    roles: ["ADMIN"], // Người dùng hoặc admin được phép truy cập
  },
];

export default adminRoutes;
