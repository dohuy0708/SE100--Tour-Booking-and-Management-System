import { tourPriceData } from "../../mocks/TourPriceData.js";

export const getTourPrices = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(tourPriceData), 500); // Mô phỏng thời gian tải
  });
};
