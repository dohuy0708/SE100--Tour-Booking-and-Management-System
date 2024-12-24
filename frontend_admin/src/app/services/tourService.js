import { tourData } from "../../mocks/TourData.js";

export const getTours = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(tourData), 500);
  });
};
