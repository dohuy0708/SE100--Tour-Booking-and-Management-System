import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import Search from "../pages/Search/Search";
import TourPage from "../pages/TourPage/TourPage";

const routes = [
  {
    path: "/",
    page: HomePage,
    isShowLayout: true,
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
