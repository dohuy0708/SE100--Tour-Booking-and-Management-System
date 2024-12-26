import React, { useState } from "react";
import TourItemComponent from "./partials/TourItemComponent";
import TourFilterComponent from "./partials/TourFilterComponent";

import image2 from "../../../mocks/img/beach-Bai-Dai_111948560.jpg";
import AddTourModal from "./partials/AddTourModal";

export default function TourPage() {
  const [tourList, setTourList] = useState([
    {
      tourId: "T001",
      tourName: "Khám phá Hà Nội",
      tourImage: image2,
      departureDate: "2024-12-30",
      price: "Dưới 5 triệu",
      location: "hanoi",
      tourType: "domestic",
    },
    {
      tourId: "T002",
      tourName: "Tham quan Đà Nẵng",
      tourImage: image2,
      departureDate: "2024-12-25",
      price: "5 - 10 triệu",
      location: "danang",
      tourType: "domestic",
    },
    {
      tourId: "T003",
      tourName: "Du lịch Hồ Chí Minh",
      tourImage: image2,
      departureDate: "2024-12-20",
      price: "10 - 20 triệu",
      location: "hochiminh",
      tourType: "domestic",
    },
    {
      tourId: "T004",
      tourName: "Hành trình Paris",
      tourImage: image2,
      departureDate: "2024-12-15",
      price: "Trên 20 triệu",
      location: "international",
      tourType: "international",
    },
    {
      tourId: "T004",
      tourName: "Hành trình Paris",
      tourImage: image2,
      departureDate: "2024-12-15",
      price: "Trên 20 triệu",
      location: "international",
      tourType: "international",
    },
    {
      tourId: "T004",
      tourName: "Hành trình Paris",
      tourImage: image2,
      departureDate: "2024-12-15",
      price: "Trên 20 triệu",
      location: "international",
      tourType: "international",
    },
    // ... các tour khác
  ]);

  const [filteredTours, setFilteredTours] = useState(tourList);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFilterApply = (filters) => {
    const filtered = tourList.filter((tour) => {
      return (
        (!filters.tourType || tour.tourType === filters.tourType) &&
        (!filters.location || tour.location === filters.location) &&
        (!filters.priceRange || tour.price === filters.priceRange)
      );
    });
    setFilteredTours(filtered);
  };

  const handleReset = () => {
    setFilteredTours(tourList);
  };

  return (
    <div className="bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">TOUR</h1>
      <div className="flex items-center justify-between mb-4">
        <TourFilterComponent
          onFilterApply={handleFilterApply}
          onReset={handleReset}
        />
        <button
          onClick={openModal}
          className="ml-4 px-4 py-2 flex bg-blue-500 gap-2 text-white rounded shadow hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          THÊM MỚI
        </button>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-4">
        {filteredTours.length > 0 ? (
          filteredTours.map((tour) => (
            <TourItemComponent key={tour.tourId} tour={tour} />
          ))
        ) : (
          <p className="text-center text-gray-500">Không có dữ liệu</p>
        )}
      </div>
      <AddTourModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
