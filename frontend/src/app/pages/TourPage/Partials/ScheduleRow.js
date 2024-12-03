import React from "react";

const ScheduleRow = ({ date, tickets, seats }) => {
  return (
    <tr className="border-b">
      <td className="p-3 pl-6   font-medium">{date}</td>
      {tickets.map((ticket, index) => (
        <td key={index} className="p-3 text-red font-medium">
          <p>{ticket.price} VND</p>
        </td>
      ))}
      <td className="p-3 text-red font-medium text-center">{seats}</td>
      <td className="p-3 text-red font-medium text-center">
        <button
          onClick={() => alert(`Mua vé ngày ${date}`)}
          className="bg-main text-white px-4 py-2 rounded hover:bg-blue-600 "
        >
          Mua vé
        </button>
      </td>
    </tr>
  );
};
export default ScheduleRow;
