import React, { useState } from "react";
import ViewTourModal from "./ViewTourModal";
import image2 from "../../../../mocks/img/beach-Bai-Dai_111948560.jpg";

export default function TourItemComponent({ tour, refreshData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="w-56 h-64 p-2 border-1 border-gray-300 bg-white rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300 focus:outline-none"
      >
        {/* Tour Image */}
        <div className="w-full h-32 mb-2">
          <img
            src={`http://localhost:8080${tour.cover_image}`}
            alt={"ảnh tour"}
            className="object-cover w-full h-full rounded-md border-2 border-gray-300"
          />
        </div>

        {/* Tour Info */}
        <div className="w-full text-center">
          <p className="font-bold text-blue-500">Mã tour: {tour.tour_code}</p>
          <p className="font-medium mt-2">{tour.tour_name}</p>
          <p className="text-sm text-gray-600 mt-1">
            Thời gian: {tour.duration}
          </p>
          {/* <p className="text-sm text-gray-600 mt-1">Giá: {tour.price}</p> */}
        </div>
      </button>
      {isModalOpen && (
        <ViewTourModal onClose={closeModal} tour={tour} reData={refreshData} />
      )}
    </div>
  );
}
