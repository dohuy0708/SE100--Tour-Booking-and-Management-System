const ScheduleStatuses = [
  { id: "1", name: "Đang chờ" },
  { id: "2", name: "Đang diễn ra" },
  { id: "3", name: "Đã diễn ra" },
];
export const getScheduleStatus = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ScheduleStatuses), 500); // Mô phỏng thời gian tải
  });
};
