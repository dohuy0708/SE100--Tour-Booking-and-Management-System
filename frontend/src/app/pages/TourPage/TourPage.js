import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import TourInfo from "./Partials/TourInfo";
import { useParams } from "react-router-dom";
import { getDomestricTours, getTourInfo } from "../../Services/userService";
import TourSection from "./Partials/TourSection";
const TourPage = () => {
  const { id } = useParams();

  const [tourDetail, setTourDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [domestricTours, setDomestricTours] = useState([]);

  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await getTourInfo(id);
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

  if (loading) return <p>Đang tải...</p>;
  if (!tourDetail) return <p>Không tìm thấy thông tin tour!</p>;

  return (
    <div>
      <Banner tour={{ title: tourDetail.title, img: tourDetail.img }} />
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
