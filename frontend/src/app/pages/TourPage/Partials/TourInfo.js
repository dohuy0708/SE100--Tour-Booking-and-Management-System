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
        <div className="flex">
          <p className="mb-2 mr-10">
            <strong>Thời gian:</strong>{" "}
            <span className="text-red font-medium"> {tour.duration}</span>
          </p>
          <p className="mb-2">
            <strong>Điểm xuất phát:</strong>{" "}
            <span className="text-red font-medium"> {tour.startPoint}</span>
          </p>
        </div>

        <p>
          <strong>Phương tiện:</strong>{" "}
          <span className="text-red font-medium"> {tour.transport}</span>
        </p>
        <ScheduleTable scheduleData={tour.days} />
      </div>
      <Itinerary days={tour.scheduleData} />
    </div>
  );
};
export default TourInfo;
