import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Access/Login";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import Search from "../pages/Search/Search";
import TourPage from "../pages/TourPage/TourPage";
import Singup from "../pages/Access/Singup";

const routes = [
  {
    path: "/",
    page: HomePage,
    isShowLayout: true,
  },
  {
    path: "/login",
    page: Login,
    isShowLayout: false,
  },
  {
    path: "/singup",
    page: Singup,
    isShowLayout: false,
  },
  {
    path: "/search",
    page: Search,
    isShowLayout: true,
  },
  {
    path: "/payment",
    page: PaymentPage,
    isShowLayout: true,
  },
  {
    path: "/tour/:id",
    page: TourPage,
    isShowLayout: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
export default routes;
