import { tourPolicyData } from "../../mocks/TourPolicyData.js";

export const getTourPolicies = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(tourPolicyData), 500); // Mô phỏng thời gian tải
  });
};
