import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TourPage from "../pages/TourPage/TourPage";

const routes = [
  {
    path: "/",
    page: HomePage,
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
