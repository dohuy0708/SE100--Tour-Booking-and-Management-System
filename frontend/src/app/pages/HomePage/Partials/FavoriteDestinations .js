import React, { useState } from "react";

const FavoriteDestinations = () => {
  const [currentRegion, setCurrentRegion] = useState("Miền Bắc");

  const destinationsByRegion = {
    "Miền Bắc": [
      { name: "Quảng Ninh", image: "/img1.png" },
      { name: "Hà Giang", image: "/img2.png" },
      { name: "Lào Cai", image: "/img3.png" },
      { name: "Ninh Bình", image: "/img2.png" },
      { name: "Yên Bái", image: "/tour1.png" },
      { name: "Sơn La", image: "/img1.png" },
    ],
    "Miền Trung": [
      { name: "Đà Nẵng", image: "/img1.png" },
      { name: "Huế", image: "/img2.png" },
      { name: "Quảng Nam", image: "/img3.png" },
      { name: "Quảng Ngãi", image: "/tour1.png" },
    ],
    "Miền Tây Nam Bộ": [
      { name: "Cần Thơ", image: "/img1.png" },
      { name: "An Giang", image: "/img2.png" },
      { name: "Đồng Tháp", image: "/img3.png" },
    ],
    "Châu Á": [
      { name: "Nhật Bản", image: "/img1.png" },
      { name: "Hàn Quốc", image: "/img2.png" },
      { name: "Thái Lan", image: "/img3.png" },
      { name: "Trung Quốc", image: "/tour1.png" },
    ],
  };

  const regions = Object.keys(destinationsByRegion);

  return (
    <div className="px-4 py-8 bg-gradient-to-r from-blue-50 to-blue-100">
      <h2 className="text-center text-3xl font-bold text-blue-600 mb-8">
        ĐIỂM ĐẾN YÊU THÍCH
      </h2>
      {/* Menu vùng */}
      <div className="flex justify-center mb-8">
        <nav className="flex space-x-6 text-blue-600 font-semibold">
          {regions.map((region) => (
            <button
              key={region}
              className={`px-4 py-2 rounded-full border-2 border-blue-600 transition-all ${
                currentRegion === region
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-100 hover:text-blue-800"
              }`}
              onClick={() => setCurrentRegion(region)}
            >
              {region}
            </button>
          ))}
        </nav>
      </div>

      {/* Grid hiển thị */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinationsByRegion[currentRegion].map((destination, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-3xl shadow-lg bg-white group"
          >
            {/* Image */}
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300 rounded-t-3xl"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-25 transition-all duration-300"></div>
            {/* Title */}
            <div className="absolute inset-0 text-white bg-black bg-opacity-25 font-bold text-xl px-4 py-2 rounded-lg group-hover:bg-opacity-50 flex items-center justify-center transition-all">
              {destination.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteDestinations;
