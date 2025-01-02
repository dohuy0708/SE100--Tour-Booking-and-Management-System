import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ScheduleTable = ({ tour }) => {
  const [ticketTypes, setTicketPrice] = useState({});
  const [schedules, setSchedules] = useState([]);
  useEffect(() => {
    console.log(tour.tourPrice);
    setTicketPrice(tour.tourPrice);
    setSchedules(
      tour.tourSchedules.filter((item) => {
        return item.status[0] !== "END";
      })
    );
  }, [tour]);

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

            <th className="p-3 font-medium">Người lớn</th>
            <th className="p-3 font-medium">Trẻ em</th>
            <th className="p-3 font-medium">Em bé</th>
            <th className="p-3 font-medium text-center">Ghế còn</th>
            <th className="p-3 font-medium text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr className="border-b p-3 font-medium">
              <td className="p-3 pl-6   font-medium">
                {new Date(schedule.departure_date).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className=" text-red">
                <p>
                  {new Intl.NumberFormat("vi-VN").format(
                    ticketTypes?.adult_price.$numberDecimal
                  )}{" "}
                  VND
                </p>
              </td>
              <td className=" text-red">
                <p>
                  {new Intl.NumberFormat("vi-VN").format(
                    ticketTypes?.children_price.$numberDecimal
                  )}{" "}
                  VND
                </p>
              </td>
              <td className=" text-red">
                <p>
                  {new Intl.NumberFormat("vi-VN").format(
                    ticketTypes?.infant_price.$numberDecimal
                  )}{" "}
                  VND
                </p>
              </td>
              <td className=" text-red text-center">
                {schedule.available_slots}
              </td>
              <td className=" text-center">
                {schedule.status[0] === "SELLING" ? (
                  schedule.available_slots > 0 ? (
                    <button
                      onClick={() => handleByTckets(tour._id, schedule._id)}
                      className="bg-main text-white px-4 py-2 rounded hover:bg-blue-600 "
                    >
                      Mua vé
                    </button>
                  ) : (
                    <button className="bg-gray-400 cursor-default text-white px-4 py-2 rounded ">
                      Hết chỗ
                    </button>
                  )
                ) : (
                  <button className="bg-gray-400 text-white cursor-default font-medium px-2 py-1 rounded-2xl ">
                    Đang diễn ra
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ScheduleTable;
