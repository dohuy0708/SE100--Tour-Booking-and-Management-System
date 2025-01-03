import React from "react";
import { useNavigate } from "react-router-dom";

function TourCard({ tour }) {
  const navigate = useNavigate();
  const goToTourPage = () => {
    navigate(`/tour/${tour._id}`);
  };
  return (
    <div className="bg-white rounded shadow-md overflow-hidden">
      <div className="w-full h-64 flex justify-center items-center">
        <img
          src={`http://localhost:8080${tour?.cover_image}`}
          alt={tour?.tour_name}
          className={`${tour.cover_image ? "w-full h-full" : ""} object-cover`}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{tour?.tour_name}</h3>
        <div className="font-semibold mt-2">
          <p className="text-lg">
            Bắt đầu:{" "}
            <span className=" text-thrd">
              {}
              {new Date(
                tour?.tourSchedules[0]?.departure_date
              ).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </p>
          <div className="flex ">
            <p className="text-lg mr-4">
              Thời gian: <span className=" text-thrd">{tour?.duration}</span>
            </p>
            <p className="text-lg">
              Còn chỗ:{" "}
              <span className=" text-thrd">
                {tour?.tourSchedules[0]?.available_slots}
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="font-semibold">
            <p className="  text-lg">Giá từ:</p>

            <span className="text-thrd  text-2xl">
              {tour.tourPrice.infant_price.$numberDecimal} đ
            </span>
          </div>
          <button
            className="px-4 py-2 font-semibold bg-thrd text-white rounded-lg "
            onClick={goToTourPage}
          >
            Đặt chỗ
          </button>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
