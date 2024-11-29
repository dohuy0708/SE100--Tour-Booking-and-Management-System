import React from "react";
import TourCard from "./TourCard";

const tours = [
  {
    id: 1,
    name: "Hà Nội - Hạ Long - Yên Tử - Ninh Bình",
    price: 6000000,
    departure: "Bến xe Miền Đông",
    duration: "3N2D",
    dates: ["18/12", "22/12", "25/12"],
    img: "/img1.png",
  },
  {
    id: 2,
    name: "Hà Nội - Hạ Long - Yên Tử - Ninh Bình",
    price: 6000000,
    departure: "Bến xe Miền Đông",
    duration: "3N2D",
    dates: ["18/12", "22/12", "25/12"],
    img: "/tour1.png",
  },
  // Thêm các tour khác tương tự...
];

function SearchResults() {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-4">
        Kết quả tìm kiếm cho "Hạ Long"
      </h2>
      <div className="space-y-4">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
