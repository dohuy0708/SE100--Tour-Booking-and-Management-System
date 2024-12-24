import { tourMediaData } from "../../mocks/TourMediaData.js";

export const getTourMedia = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(tourMediaData), 500); // Mô phỏng thời gian tải
  });
};
