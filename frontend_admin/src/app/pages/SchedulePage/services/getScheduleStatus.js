import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
const ScheduleStatuses = [
  { id: "1", name: "Đang chờ" },
  { id: "2", name: "Đang diễn ra" },
  { id: "3", name: "Đã diễn ra" },
];
export const getScheduleStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ScheduleStatus`);
    console.log("Response data:", response.data);
    return ScheduleStatuses; // Giả sử server trả về dữ liệu ở response.data
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error; // Ném lỗi ra để hàm gọi xử lý
  }
};
