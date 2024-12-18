import { scheduleData } from "../../mocks/ScheduleData.js";

export const getSchedules = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(scheduleData), 500);
  });
};
