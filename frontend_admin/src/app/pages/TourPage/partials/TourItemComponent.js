import React, { useState } from "react";
import ViewTourModal from "./ViewTourModal";

export default function TourItemComponent({ tour }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="flex flex-col items-center p-2 pb-4 border-1 border-gray-300 bg-white rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300 focus:outline-none"
      >
        {/* Tour Image */}
        <div className="w-42 h-26 mb-2">
          <img
            src={tour.tourImage}
            alt={tour.tourName}
            className="object-cover w-42 h-26 rounded-md border-2 border-gray-300"
          />
        </div>

        {/* Tour Info */}
        <div className="w-full text-center">
          <p className="font-bold text-blue-500">Mã tour: {tour.tourId}</p>
          <p className="font-medium mt-2">{tour.tourName}</p>
          <p className="text-sm text-gray-600 mt-1">
            Thời gian: {tour.departureDate}
          </p>
          <p className="text-sm text-gray-600 mt-1">Giá: {tour.price}</p>
        </div>
      </button>
      {isModalOpen && <ViewTourModal onClose={closeModal} tour={tour} />}
    </div>
  );
}
