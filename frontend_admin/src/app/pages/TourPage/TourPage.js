import React, { useEffect, useState } from "react";
import TourItemComponent from "./partials/TourItemComponent";
import TourFilterComponent from "./partials/TourFilterComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import image2 from "../../../mocks/img/beach-Bai-Dai_111948560.jpg";
import AddTourModal from "./partials/AddTourModal";
import { FilterProvider } from "../../context/FilterContext";
import { notifyError, notifySuccess } from "../../components/Notification";

export default function TourPage() {
  const [tourList, setTourList] = useState();
  const [filteredTours, setFilteredTours] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTourData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/tours/detail", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const tourlist = await response.json();
      console.log("tour llisst", tourlist);
      setTourList(tourlist);
      setFilteredTours(tourlist);
    } catch (e) {
      console.error("Error:", e);
      // notifyError("Lỗi khi lấy dữ ");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTourData();
  }, []);

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
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-mincontent py-6">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
        <span className="ml-4 text-lg text-gray-700">Đang tải...</span>
      </div>
    );
  }
  return (
    <FilterProvider>
      <div className="bg-gray-100">
        <ToastContainer />
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
          {filteredTours && filteredTours.length > 0 ? (
            filteredTours.map((tour) => (
              <TourItemComponent
                key={tour._id}
                tour={tour}
                refreshData={fetchTourData}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Không có dữ liệu</p>
          )}
        </div>
        <AddTourModal
          isOpen={isModalOpen}
          onClose={closeModal}
          refreshData={fetchTourData}
        />
      </div>
    </FilterProvider>
  );
}
