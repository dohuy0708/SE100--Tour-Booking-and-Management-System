import React, { useState } from "react";

const TourCard = ({ tour }) => {
  return (
    <div className="grid grid-cols-5   bg-white rounded-lg shadow-md h-[16rem]  mr-8">
      {/* Hình ảnh tour */}
      <div className="col-span-2 ">
        <img
          src={tour.img} // Thay đổi với link ảnh thật
          alt="Tour"
          className="h-[16rem] w-full object-cover rounded-lg"
        />
      </div>

      {/* Thông tin tour */}
      <div className=" col-span-3 p-4 flex flex-col justify-between">
        <h3 className="font-semibold text-xl ">{tour.name}</h3>

        <p className=" font-semibold">
          Xuất phát:{" "}
          <span className="font-semibold bg-white text-red">
            {tour.departure}
          </span>
        </p>
        <p className=" font-semibold">
          Thời gian:{" "}
          <span className="font-semibold bg-white text-red">
            {tour.duration}
          </span>
        </p>

        <div className=" font-semibold flex items-center">
          <span className="mr-2 bg-white">Ngày khởi hành:</span>
          <div className="flex space-x-2">
            {tour.dates.map((date) => (
              <span
                key={date}
                className="px-4 py-0.5 rounded-lg text-red border-2 border-red"
              >
                {date}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <span className="bg-white font-semibold">Giá từ:</span>
            <p className="text-red-500 text-2xl font-semibold text-red">
              {tour.price} đ
            </p>
          </div>
          {/* Nút Đặt chỗ */}
          <div>
            <button className="bg-red text-white py-2 px-6 rounded-lg ">
              Đặt chỗ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
