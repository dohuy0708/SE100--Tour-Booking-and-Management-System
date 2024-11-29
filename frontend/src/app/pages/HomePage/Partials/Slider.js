import React, { useState, useEffect } from "react";

const tours = [
  {
    id: 1,
    place: "Đà Nẵng",
    title: "ĐÓN TẾT DƯƠNG LỊCH 2025",
    image: "/img1.png",
  },
  {
    id: 2,
    place: "Hạ Long",
    title: "Du xuân trên Vịnh 2025",
    image: "/img2.png",
  },
  {
    id: 3,
    place: "Hội An",
    title: "Phố cổ đón xuân 2025",
    image: "/img3.png",
  },
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(null);

  // Xử lý tự động chuyển slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tours.length);
    }, 5000);
    setAutoPlay(interval); // Lưu lại tham chiếu để có thể dừng
    return () => clearInterval(interval); // Dọn dẹp khi unmount hoặc state thay đổi
  }, [currentSlide]);

  // Khi người dùng ấn vào nút tròn
  const handleDotClick = (index) => {
    clearInterval(autoPlay); // Dừng interval hiện tại
    setCurrentSlide(index); // Chuyển đến slide được chọn
  };

  return (
    <div className="relative">
      <div className="relative h-96">
        {tours.map((tour, index) => (
          <div
            key={tour.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
              <h1 className="text-4xl font-bold text-center mb-2">
                {tour.place.toUpperCase()}
              </h1>
              <h1 className="text-4xl font-bold text-center mb-4">
                {tour.title.toUpperCase()}
              </h1>
              <button className="mt-4 px-6 py-2 bg-main rounded">
                Xem thêm
              </button>
            </div>
          </div>
        ))}
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
