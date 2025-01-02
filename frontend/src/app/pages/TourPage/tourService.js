import axios from "axios";
const API_BASE_URL = "http://localhost:8080";

export const getTourById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tours?id=${id}`);

    return response.data;
  } catch (error) {
    console.log("lỗi khi lấy thông tin tour: ", error);
    throw error.response ? error.response.data : error;
  }
};
export const getTourDetails = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tours/detail`);

    return response.data;
  } catch (error) {
    console.log("lỗi khi lấy thông tin tour: ", error);
    throw error.response ? error.response.data : error;
  }
};
export const getSchedulesByTour = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/schedules/getbytour/${id}`
    );

    return response.data;
  } catch (error) {
    console.log("lỗi khi lấy thông lịch trình: ", error);
    throw error.response ? error.response.data : error;
  }
};
