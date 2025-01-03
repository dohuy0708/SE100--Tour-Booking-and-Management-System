import axios from "axios";
const API_BASE_URL = "http://localhost:8080";

export const getTourDetails = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tours/detail`);

    return response.data;
  } catch (error) {
    console.log("lỗi khi lấy thông tin tour: ", error);
    throw error.response ? error.response.data : error;
  }
};
export const getTourDetailsBySearch = async (searchString, filters) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tours/searchandfilter`, {
      searchString, // Từ khóa tìm kiếm
      filters, // Các bộ lọc (priceRange, destination, selectedDate, ...)
    });

    return response.data;
  } catch (error) {
    console.log("lỗi khi lấy thông tin tour: ", error);
    throw error.response ? error.response.data : error;
  }
};
export const getLocations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/locations`);

    return response.data;
  } catch (error) {
    console.log("lỗi khi lấy thông tin tour: ", error);
    throw error.response ? error.response.data : error;
  }
};
