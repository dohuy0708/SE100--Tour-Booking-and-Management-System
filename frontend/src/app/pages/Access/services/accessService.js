import axios from "axios";
const API_BASE_URL = "http://localhost:8080/auth";

export const handleLoginApi = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      { mail: email, pass: password }, // Dữ liệu gửi trong body
      {
        headers: {
          "Content-Type": "application/json", // Sử dụng JSON format cho body
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("lỗi: ", error);
    throw error.response ? error.response.data : error;
  }
};

export const handleRegister = async (mail, pass, name, phone, dob) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      mail,
      pass,
      name,
      phone,
      dob,
    });
    return response.data; // Trả về dữ liệu nhận được từ API
  } catch (error) {
    console.error("Error registering user:", error);
    throw error.response?.data || error.message; // Ném lỗi để xử lý phía trên
  }
};

export const resetPasswordApi = async (mail) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgot`, {
      mail,
    });
    return response.data; // Trả về dữ liệu nhận được từ API
  } catch (error) {
    console.error("Error reset password user:", error);
    throw error.response?.data || error.message; // Ném lỗi để xử lý phía trên
  }
};
