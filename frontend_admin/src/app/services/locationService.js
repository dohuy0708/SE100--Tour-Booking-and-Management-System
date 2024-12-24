export const locationData = [
  {
    locationId: 1,
    locationName: "Phú Yên",
    address: "Kỳ Co",
  },
  {
    locationId: 2,
    locationName: "Hà Nội",
    address: "Sa Pa",
  },
  {
    locationId: 3,
    locationName: "Bình Định",
    address: "Quy Nhơn",
  },
];

export const getLocations = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(locationData), 500); // Mô phỏng thời gian tải
  });
};
