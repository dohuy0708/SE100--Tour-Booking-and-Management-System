import { tourLocationsData } from "../../mocks/TourLocationData";

export const getTourLocations = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(tourLocationsData), 500); // Mô phỏng thời gian tải
  });
};
