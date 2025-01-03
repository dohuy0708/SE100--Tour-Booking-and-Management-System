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
import { getTourHome } from "./services/tourService";

export default function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Thêm isLoading
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
        setIsLoading(true); // Bắt đầu loading

        // Lấy tất cả các tour
        let allTours = await getTourHome();

        //banner tour
        const banRes = allTours
          .filter((tour) => tour.tourSchedules.length > 0)
          .slice(0, 3);
        setBannerTours(banRes);

        // Lọc và lấy 3 tour đầu tiên
        const newRes = allTours
          .filter((tour) => tour.tourSchedules.length > 0)
          .slice(-3);
        setNewTours(newRes);

        // Lọc và lấy 3 tour có tour_type="TRONG NƯỚC" và có ít nhất một lịch trình
        const domestricRes = allTours
          .filter(
            (tour) =>
              tour.tour_type[0] === "TRONG NƯỚC" &&
              tour.tourSchedules.length > 0
          )
          .slice(0, 3);
        setDomestricTours(domestricRes);

        // Lọc và lấy 3 tour có tour_type="NƯỚC NGOÀI" và có ít nhất một lịch trình
        const abroadRes = allTours
          .filter(
            (tour) =>
              tour.tour_type[0] === "NƯỚC NGOÀI" &&
              tour.tourSchedules.length > 0
          )
          .slice(0, 3);
        setAbroadTours(abroadRes);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      } finally {
        setIsLoading(false); // Kết thúc loading
      }
    };

    fetchTours();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-mincontent py-6">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
        <span className="ml-4 text-lg text-gray-700">Đang tải...</span>
      </div>
    );
  }

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
      {/* <FavoriteDestinations destinations={destinations} /> */}
    </div>
  );
}
