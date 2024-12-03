import React, { useState } from "react";
import Banner from "../../components/Banner";
import TourInfo from "./Partials/TourInfo";
const TourPage = () => {
  const tour = {
    duration: "3 ngày 2 đêm",
    startPoint: "Bến xe miền Đông, HCM",
    transport: "Xe khách",
    days: [
      {
        date: "2024-12-01",
        seats: 65,
        tickets: [
          { type: "Người lớn", price: "900,000" },
          { type: "Trẻ em", price: "700,000" },
          { type: "Ưu đãi", price: "500,000" },
        ],
      },
      {
        date: "2024-12-05",
        seats: 53,
        tickets: [
          { type: "Người lớn", price: "950,000" },
          { type: "Trẻ em", price: "750,000" },
          { type: "Ưu đãi", price: "550,000" },
        ],
      },
      {
        date: "2024-12-10",
        seats: 43,
        tickets: [
          { type: "Người lớn", price: "1,000,000" },
          { type: "Trẻ em", price: "800,000" },
          { type: "Ưu đãi", price: "600,000" },
        ],
      },
    ],
    scheduleData: [
      {
        description:
          "Ngày đầu tiên, chúng ta sẽ ... tham quan các điểm nổi tiếng.",
        image: "/img2.png",
      },
      {
        description:
          "Ngày thứ hai, đoàn tham quan ... các danh lam thắng cảnh.",
        image: "img3.png",
      },
      {
        description: "Ngày cuối, du khách tự do khám phá ... và mua sắm.",
        image: "tour1.png",
      },
    ],
  };

  const tourBanner = {
    title: "Hà Nội - Hạ Long - Yên Tử - Ninh Bình",
    img: "/img1.png",
  };
  return (
    <div>
      <Banner tour={tourBanner} />
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <TourInfo tour={tour} />
      </div>
    </div>
  );
};

export default TourPage;
