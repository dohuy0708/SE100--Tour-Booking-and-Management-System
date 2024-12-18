import { feedbackData } from "../../mocks/FeedbackData.js";
export const getFeedbacks = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(feedbackData), 500); // Mô phỏng thời gian tải
  });
};
