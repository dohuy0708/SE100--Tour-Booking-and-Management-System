import BookingPage from "../pages/BookingPage";
import CustomerPage from "../pages/CustomerPage/CustomerPage";
import HomePage from "../pages/HomePage";

import SchedulePage from "../pages/SchedulePage";

const staffRoutes = [
  {
    // path: "/",
    // page: HomePage,
    // isShowLayout: true,
    // roles: ["staff", "admin"], // Cả staff và admin đều có quyền
  },
  {
    path: "/",
    page: HomePage,
    isShowLayout: true,
  },
  {
    path: "/booking",
    page: BookingPage,
    isShowLayout: true,
  },
  {
    path: "/schedule",
    page: SchedulePage,
    isShowLayout: true,
  },
  {
    path: "/customer",
    page: CustomerPage,
    isShowLayout: true,
  },
];

export default staffRoutes;
