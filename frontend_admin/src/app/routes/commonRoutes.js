import BookingPage from "../pages/BookingPage";
import CustomerPage from "../pages/CustomerPage/CustomerPage";
import ForgotPassPage from "../pages/ForgotPassPage";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/LoginPage/LoginPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import UnAuthorizedPage from "../pages/NotFoundPage/UnAuthorizedPage";
import ResetPasswordPage from "../pages/ResetPassPage";
import SchedulePage from "../pages/SchedulePage";
import SignUp from "../pages/SignupPage";
import TourPage from "../pages/TourPage/TourPage";
const commonRoutes = [
  {
    path: "*",
    page: NotFoundPage,
    roles: ["STAFF", "ADMIN"], // STAFF hoặc admin được phép truy cập
  },
  {
    path: "/unauthorized",
    page: UnAuthorizedPage,
  },
  {
    path: "/",
    page: HomePage,
    isShowLayout: true,
    roles: ["STAFF", "ADMIN"], // STAFF hoặc admin được phép truy cập
  },
  {
    path: "/login",
    page: Login,
  },
  {
    path: "/forgot_password",
    page: ForgotPassPage,
  },
  {
    path: "/reset_password",
    page: ResetPasswordPage,
    roles: ["STAFF", "ADMIN"], // STAFF hoặc admin được phép truy cập
  },
  {
    path: "/verify",
    page: ForgotPassPage,
    roles: ["STAFF", "ADMIN"], // STAFF hoặc admin được phép truy cập
  },
  {
    path: "/booking",
    page: BookingPage,
    isShowLayout: true,
    roles: ["STAFF", "ADMIN"], // STAFF hoặc admin được phép truy cập
  },
  {
    path: "/schedule",
    page: SchedulePage,
    isShowLayout: true,
    roles: ["STAFF", "ADMIN"], // STAFF hoặc admin được phép truy cập
  },
  {
    path: "/customer",
    page: CustomerPage,
    isShowLayout: true,
    roles: ["STAFF", "ADMIN"], // STAFF hoặc admin được phép truy cập
  },
];

export default commonRoutes;
