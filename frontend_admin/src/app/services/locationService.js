import axios from "axios";
const locationData = [
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

const API_BASE_URL = "http://localhost:8080";
export const getLocations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/locations`);
    console.log("Response data:", response.data);
    return response.data; // Giả sử server trả về dữ liệu ở response.data
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error; // Ném lỗi ra để hàm gọi xử lý
  }
};
