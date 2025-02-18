import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import TourInfo from "./Partials/TourInfo";
import { useParams } from "react-router-dom";
import { getDomestricTours, getTourInfo } from "../../Services/userService";
import TourSection from "./Partials/TourSection";
import { getSchedulesByTour, getTourById, getTourDetails } from "./tourService";
const TourPage = () => {
  const { id } = useParams();

  const [tourDetail, setTourDetail] = useState(null);
  const [schedulesData, setSchedulesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [domestricTours, setDomestricTours] = useState([]);

  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await getTourById(id);
        if (response) {
          setTourDetail(response);
        }
        const domestricRes = await getDomestricTours();
        if (domestricRes) setDomestricTours(domestricRes);
      } catch (error) {
        console.error("Failed to fetch tour details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetail();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-mincontent py-6">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
        <span className="ml-4 text-lg text-gray-700">Đang tải...</span>
      </div>
    );
  if (!tourDetail)
    return (
      <div className="min-h-mincontent">
        <p>Không tìm thấy thông tin tour!</p>
      </div>
    );

  return (
    <div>
      <Banner tour={{ title: tourDetail?.tour_name, img: tourDetail?.img }} />
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <TourInfo tour={tourDetail} />
      </div>
      <div className="mx-24">
        <TourSection title={"Các tour tương tự"} tours={domestricTours} />
      </div>
    </div>
  );
};

export default TourPage;
