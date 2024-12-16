import React, { useEffect, useState } from "react";
import Slider from "./Partials/Slider";
import SearchBar from "../../components/SearchBar";
import TourSection from "./Partials/TourSection";
import {
  getAbroadTours,
  getBannerTours,
  getDomestricTours,
  getNewTours,
} from "../../Services/userService";

export default function HomePage() {
  const [bannerTours, setBannerTours] = useState([]);
  const [newTours, setNewTours] = useState([]);
  const [domestricTours, setDomestricTours] = useState([]);
  const [abroadTours, setAbroadTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const bannerRes = await getBannerTours();
        if (bannerRes) setBannerTours(bannerRes);
        //
        const newRes = await getNewTours();
        if (newRes) setNewTours(newRes);
        //
        const domestricRes = await getDomestricTours();
        if (domestricRes) setDomestricTours(domestricRes);
        //
        const abroadRes = await getAbroadTours();
        if (abroadRes) setAbroadTours(abroadRes);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      }
    };

    fetchTours();
  }, []);

  return (
    <div>
      <div className="relative">
        <Slider tours={bannerTours} />
        <div className="absolute w-1/2 bottom-[-22px] left-1/2 transform -translate-x-1/2">
          <SearchBar />
        </div>
      </div>
      <div className="mx-32">
        <TourSection title="Đón Tết 2025" tours={newTours} />
        <TourSection title="Tour trong nước nổi bật" tours={domestricTours} />
        <TourSection title="Tour nước ngoài nổi bật" tours={abroadTours} />
      </div>
    </div>
  );
}
