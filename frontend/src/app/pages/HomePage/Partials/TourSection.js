import React from "react";
import TourCard from "./TourCard";

function TourSection({ title, tours }) {
  return (
    <div className="my-8 px-4">
      {tours.length > 0 ? (
        <div>
          <h2 className="text-3xl font-semibold  mb-4 text-main">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-x-8">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default TourSection;
