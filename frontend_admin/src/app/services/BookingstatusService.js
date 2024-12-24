const bookingStatuses = [
  { id: "1", name: "Đang xử lý" },
  { id: "2", name: "Đã duyệt" },
  { id: "3", name: "Đã hủy" },
];
export const getBookingStatus = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(bookingStatuses), 500); // Mô phỏng thời gian tải
  });
};
