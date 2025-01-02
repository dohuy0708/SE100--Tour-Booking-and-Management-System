import React from "react";
import ScheduleTable from "./ScheduleTable";
import Itinerary from "./Itinerary";

const TourInfo = ({ tour }) => {
  return (
    <div>
      <h2 className="text-3xl text-main font-semibold mb-4">
        Thông tin về tour
      </h2>
      <div className="bg-[#F9F9F9] p-6 rounded-lg shadow-md">
        <div className="">
          <p className="mb-2 mr-10">
            <strong>Thời gian:</strong>{" "}
            <span className="text-red font-medium">
              {" "}
              {tour?.duration} ngày {tour?.duration - 1} đêm
            </span>
          </p>
          <p className="mb-2">
            <strong>Mô tả:</strong>{" "}
            <span className=" "> {tour?.description}</span>
          </p>
        </div>

        <ScheduleTable tour={tour} />
      </div>
      <Itinerary days={tour.tourPrograms} />
    </div>
  );
};
export default TourInfo;
