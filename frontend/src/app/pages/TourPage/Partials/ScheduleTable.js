import React from "react";
import { useNavigate } from "react-router-dom";

const ScheduleTable = ({ scheduleData, tour }) => {
  const ticketTypes =
    scheduleData.length > 0
      ? scheduleData[0].tickets.map((ticket) => ticket.type)
      : [];
  const navigate = useNavigate();
  const handleByTckets = (tourId, dayId) => {
    navigate(`/payment?tourId=${tourId}&dayId=${dayId}`);
  };
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
            <tr className="border-b p-3 font-medium">
              <td className="p-3 pl-6   font-medium">{schedule.date}</td>
              {schedule.tickets.map((ticket, index) => (
                <td key={index} className=" text-red">
                  <p>{ticket?.price.toLocaleString()} VND</p>
                </td>
              ))}
              <td className=" text-red text-center">
                {schedule.available_slots}
              </td>
              <td className=" text-center">
                <button
                  onClick={() => handleByTckets(tour.id, schedule.id)}
                  className="bg-main text-white px-4 py-2 rounded hover:bg-blue-600 "
                >
                  Mua vé
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ScheduleTable;
