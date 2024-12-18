import React, { createContext, useContext, useState, useEffect } from "react";
import { getTourSchedule } from "../services/Tour_with_ScheduleService";

// Create TourContext
export const TourContext = createContext();

// Create a provider component
export const TourProvider = ({ children }) => {
  const [tourData, setTourData] = useState([]);

  // Fetch tour data and set it into state
  useEffect(() => {
    const fetchTours = async () => {
      const tours = await getTourSchedule();
      console.log("Tour Data context:", tours);
      setTourData(tours);
    };

    fetchTours();
  }, []);

  return (
    <TourContext.Provider value={{ tourData }}>{children}</TourContext.Provider>
  );
};
export const useTourContext = () => {
  return useContext(TourContext);
};
