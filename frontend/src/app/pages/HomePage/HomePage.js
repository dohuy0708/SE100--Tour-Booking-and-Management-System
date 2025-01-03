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
import FavoriteDestinations from "./Partials/FavoriteDestinations ";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?keyword=${encodeURIComponent(searchKeyword)}`);
  };

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
  const destinations = [
    {
      name: "Quảng Ninh",
      image: "/img1.png",
    },
    {
      name: "Hà Giang",
      image: "/img2.png",
    },
    {
      name: "Lào Cai",
      image: "/img3.png",
    },
    {
      name: "Ninh Bình",
      image: "/tour1.png",
    },
    {
      name: "Yên Bái",
      image: "/img1.png",
    },
    // {
    //   name: "Sơn La",
    //   image: "/img2.png",
    // },
  ];
  return (
    <div>
      <div className="relative">
        <Slider tours={bannerTours} />
        <div className="absolute w-1/2 bottom-[-22px] left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm tour..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(); // Thực hiện tìm kiếm khi nhấn Enter
                }
              }}
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-main"
            />
            <button onClick={handleSearch} className="absolute top-2 right-2">
              <MagnifyingGlassIcon className="h-6 hover:text-main" />
            </button>
          </div>
        </div>
      </div>
      <div className="mx-32">
        <TourSection title="Đón Tết 2025" tours={newTours} />
        <TourSection title="Tour trong nước nổi bật" tours={domestricTours} />
        <TourSection title="Tour nước ngoài nổi bật" tours={abroadTours} />
      </div>
      <FavoriteDestinations destinations={destinations} />
    </div>
  );
}
