import React from "react";
import ScheduleRow from "./ScheduleRow";

const ScheduleTable = ({ scheduleData }) => {
  const ticketTypes =
    scheduleData.length > 0
      ? scheduleData[0].tickets.map((ticket) => ticket.type)
      : [];

  return (
    <div className="bg-secd mt-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-b-black">
            <th className="p-3 font-medium">Ngày khởi hành</th>
            {ticketTypes.map((type, index) => (
              <th key={index} className="p-3 font-medium">
                {type}
              </th>
            ))}
            <th className="p-3 font-medium text-center">Ghế còn</th>
            <th className="p-3 font-medium text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((schedule, index) => (
            <ScheduleRow
              key={index}
              date={schedule.date}
              tickets={schedule.tickets}
              seats={schedule.seats}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ScheduleTable;
