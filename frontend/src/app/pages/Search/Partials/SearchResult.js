import React from "react";
import TourCard from "./TourCard";

function SearchResults({ tours }) {
  return (
    <div className="mt-4">
      {/* <h2 className="text-lg font-semibold mb-4">
        Kết quả tìm kiếm cho "Hạ Long"
      </h2> */}
      <div className="space-y-4">
        {tours.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
