import { paymentData } from "../../mocks/PaymentData.js";

export const getPayments = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(paymentData), 500); // Mô phỏng thời gian tải
  });
};
