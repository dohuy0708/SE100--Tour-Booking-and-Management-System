import React, { createContext, useContext, useState, useEffect } from "react";
import { getLocations } from "../services/locationService";
import { getTourSchedule } from "../services/Tour_with_ScheduleService";

// Tạo context
const FilterContext = createContext();

// Tạo provider để cung cấp giá trị cho toàn bộ ứng dụng
export const FilterProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [tourData, setTourData] = useState([]);
  // Fetch dữ liệu cho location
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Giả sử bạn có các API để lấy dữ liệu location
        const locationData = await getLocations(); // Gọi API hoặc fetch dữ liệu cho locations
        const tours = await getTourSchedule();
        console.log("Tour Data context:", tours);
        setTourData(tours);
        setLocations(locationData);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <FilterContext.Provider value={{ locations, tourData }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
