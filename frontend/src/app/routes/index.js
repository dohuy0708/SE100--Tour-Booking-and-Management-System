import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
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
    path: "/tour",
    page: TourPage,
    isShowLayout: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
export default routes;
