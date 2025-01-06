import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Slider({ tours }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Xử lý tự động chuyển slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tours.length);
    }, 5000);
    return () => clearInterval(interval); // Dọn dẹp interval khi unmount
  }, [tours.length]);

  // Khi người dùng ấn vào nút tròn
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handleToTourDetail = (id) => {
    console.log("ID:", id);
    navigate(`/tour/${id}`);
  };

  return (
    <div className="relative">
      <div className="relative h-96 overflow-hidden">
        {tours.map(
          (tour, index) =>
            index === currentSlide ? ( // Chỉ render slide hiện tại
              <div
                key={tour?._id}
                className="w-full h-96 transition-transform duration-700"
              >
                <img
                  src={
                    tour.cover_image
                      ? `http://localhost:8080${tour?.cover_image}`
                      : `/img${index + 1}.png`
                  }
                  alt={tour?.tour_name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
                  <h1 className="text-4xl font-bold text-center mb-2">
                    {tour?.tour_name.toUpperCase()}
                  </h1>
                  <button
                    className="mt-4 px-6 py-2 bg-main rounded"
                    onClick={() => handleToTourDetail(tour._id)}
                  >
                    Xem thêm
                  </button>
                </div>
              </div>
            ) : null // Không render các slide không phải hiện tại
        )}
      </div>

      {/* Dấu tròn chuyển slide */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {tours.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-main" : "bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
