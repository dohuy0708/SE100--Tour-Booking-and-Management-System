import React, { useState } from "react";

const Itinerary = ({ days }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-main mb-4">Lịch trình</h2>
      <div className="flex border-b mb-4">
        {days.map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 font-medium ${
              activeTab === index
                ? "text-main border-b-2 border-main"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(index)}
          >
            Ngày {index + 1}
          </button>
        ))}
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">Ngày {activeTab + 1}</h3>
        <p className=" mb-4">{days[activeTab].program_description}</p>
        {/* {days[activeTab].image && (
          <img
            src={days[activeTab].image}
            alt={`Ngày ${activeTab + 1}`}
            className="w-full rounded-lg shadow-md"
          />
        )} */}

        <img
          src={`/img${activeTab + 1}.png`}
          alt={`Ngày ${activeTab + 1}`}
          className="w-full rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};
export default Itinerary;
