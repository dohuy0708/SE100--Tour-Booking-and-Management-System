import React from "react";

export default function Banner({ tour }) {
  return (
    <div className="h-[400px] relative">
      <img
        src={tour.img ? tour.img : "/img3.png"}
        alt="Ảnh đại diện tour"
        className="h-full w-full object-cover"
      />
      <div className=" absolute bottom-0 rounded-t-2xl left-1/2 transform -translate-x-1/2 h-[80px] w-[70%] bg-black bg-opacity-70 flex items-center px-4">
        <span className="  text-4xl text-white ">{tour.title}</span>
      </div>
    </div>
  );
}
