import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TourPage from "../pages/TourPage/TourPage";

const commonRoutes = [
  {
    path: "*",
    page: NotFoundPage,
  },
  {
    path: "/login",
    page: LoginPage,
  },
];

export default commonRoutes;
