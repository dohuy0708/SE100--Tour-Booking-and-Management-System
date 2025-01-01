import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import TourInfo from "./Partials/TourInfo";
import { useParams } from "react-router-dom";
import { getDomestricTours, getTourInfo } from "../../Services/userService";
import TourSection from "./Partials/TourSection";
import { getSchedulesByTour, getTourById } from "./tourService";
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
          setTourDetail(response[0]);
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

    const fetchSchedules = async () => {
      try {
        const response = await getSchedulesByTour(id);
        console.log(response);
        if (response) {
          setTourDetail(response);
        }
      } catch (error) {
        console.error("Failed to fetch tour's schedules:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (!tourDetail) return <p>Không tìm thấy thông tin tour!</p>;

  return (
    <div>
      <Banner tour={{ title: tourDetail?.tour_name, img: tourDetail?.img }} />
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <TourInfo tour={tourDetail} schedules={schedulesData} />
      </div>
      <div className="mx-24">
        <TourSection title={"Các tour tương tự"} tours={domestricTours} />
      </div>
    </div>
  );
};

export default TourPage;
