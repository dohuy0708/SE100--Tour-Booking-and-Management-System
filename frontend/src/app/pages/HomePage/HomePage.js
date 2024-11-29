import React from "react";
import Slider from "./Partials/Slider";
import SearchBar from "../../components/SearchBar";
import TourSection from "./Partials/TourSection";

export default function HomePage() {
  const toursData = [
    {
      id: 1,
      title: "Hà Nội - Hạ Long - Yên Tử - Ninh Bình",
      startTime: "08:00 12/12/2024",
      duration: "3N2Đ",
      price: "6.000.000",
      seatsLeft: 3,
      image: "/tour1.png",
    },
    {
      id: 2,
      title: "Hà Nội - Hạ Long - Yên Tử - Ninh Bình",
      startTime: "08:00 12/12/2024",
      duration: "3N2Đ",
      price: "6.000.000",
      seatsLeft: 3,
      image: "/tour1.png",
    },
    {
      id: 3,
      title: "Hà Nội - Hạ Long - Yên Tử - Ninh Bình",
      startTime: "08:00 12/12/2024",
      duration: "3N2Đ",
      price: "6.000.000",
      seatsLeft: 3,
      image: "/tour1.png",
    },
  ];
  return (
    <div>
      <div className="relative">
        <Slider />
        <div className="absolute w-1/2 bottom-[-22px] left-1/2 transform -translate-x-1/2">
          <SearchBar />
        </div>
      </div>
      <div className="mx-4">
        <TourSection title="Đón Tết 2025" tours={toursData} />
        <TourSection title="Tour trong nước nổi bật" tours={toursData} />
        <TourSection title="Tour nước ngoài nổi bật" tours={toursData} />
      </div>
    </div>
  );
}
