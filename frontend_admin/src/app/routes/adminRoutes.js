import FeedbackPage from "../pages/FeedbackPage";
import HistoryPage from "../pages/HistoryPage";
import LocationPage from "../pages/LocationPage";
import StaffPage from "../pages/StaffPage";
import TourPage from "../pages/TourPage";

const adminRoutes = [
  {
    //   path: "/tour",
    //   page: TourPage,
    //   isShowLayout: true,
    //   roles: ["admin"], // Chỉ admin có quyền
  },
  {
    path: "/Tour",
    page: TourPage,
    isShowLayout: true,
  },
  {
    path: "/Staff",
    page: StaffPage,
    isShowLayout: true,
  },
  {
    path: "/History",
    page: HistoryPage,
    isShowLayout: true,
  },
  {
    path: "/Feedback",
    page: FeedbackPage,
    isShowLayout: true,
  },
  {
    path: "/Location",
    page: LocationPage,
    isShowLayout: true,
  },
];

export default adminRoutes;
