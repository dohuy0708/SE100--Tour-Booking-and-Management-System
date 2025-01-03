import React from "react";
import { useNavigate } from "react-router-dom";

const TourCard = ({ tour }) => {
  const nav = useNavigate();
  const handleToTourPage = (id) => {
    nav(`/tour/${id}`);
  };
  return (
    <div className="grid grid-cols-5   bg-white rounded-lg shadow-md h-[16rem]  mr-8">
      {/* Hình ảnh tour */}
      <div className="col-span-2 ">
        <img
          src={tour?.cover_image} // Thay đổi với link ảnh thật
          alt="Tour"
          className="h-[16rem] w-full object-cover rounded-lg"
        />
      </div>

      {/* Thông tin tour */}
      <div className=" col-span-3 p-4 flex flex-col justify-between">
        <h3 className="font-semibold text-xl ">{tour?.tour_name}</h3>

        {/* <p className=" font-semibold">
          Xuất phát:{" "}
          <span className="font-semibold bg-white text-red">
            {tour?.departure_date}
          </span>
        </p> */}
        <p className=" font-semibold">
          Thời gian:{" "}
          <span className="font-semibold bg-white text-red">
            {tour?.duration}
          </span>
        </p>

        <div className=" font-semibold flex items-center">
          <span className="mr-2 bg-white">Ngày khởi hành:</span>
          <div className="flex space-x-2 overflow-hidden">
            {tour?.tourSchedules?.length > 0 ? (
              tour?.tourSchedules.map((date) => (
                <span
                  key={date._id}
                  className="px-4 py-0.5 rounded-lg text-red border-2 border-red"
                >
                  {new Date(date.departure_date).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              ))
            ) : (
              <p className="text-red font-medium">chưa có lịch</p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <span className="bg-white font-semibold">Giá từ:</span>
            <p className="text-red-500 text-2xl font-semibold text-red">
              {parseFloat(
                tour?.tourPrice?.infant_price?.$numberDecimal
              ).toLocaleString()}{" "}
              đ
            </p>
          </div>
          {/* Nút Đặt chỗ */}
          <div>
            <button
              className="bg-red text-white py-2 px-6 rounded-lg "
              onClick={() => handleToTourPage(tour?._id)}
            >
              Đặt chỗ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
