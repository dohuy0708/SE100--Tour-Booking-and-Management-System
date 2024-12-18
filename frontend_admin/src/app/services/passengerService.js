import { passengerData } from "../../mocks/PassengerData.js";

export const getPassengers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(passengerData), 500); // Mô phỏng thời gian tải
  });
};
