import axios from "axios";
const API_BASE_URL = "http://localhost:8080";

export const resetPassword = async (mail, oldpass, newpass) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/reset`, {
      mail,
      oldpass,
      newpass,
    });
    return response.data; // Giả sử response trả về dữ liệu về trạng thái thành công hoặc thất bại
  } catch (error) {
    console.error("Lỗi khi thay đổi mật khẩu:", error);
    throw error; // Nếu có lỗi, ném lại để xử lý sau
  }
};

export const updateInfo = async (id, name, email, phone, dob) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/users/${id}`,
      {
        name,
        email,
        phone,
        dob,
      },
      { withCredentials: true }
    );
    return response.data; // Giả sử response trả về dữ liệu về trạng thái thành công hoặc thất bại
  } catch (error) {
    console.error("Lỗi khi thay đổi thông tin:", error);
    throw error; // Nếu có lỗi, ném lại để xử lý sau
  }
};

export const getMyBookings = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/customer/${id}`);
    console.log("đặt: ", response.data);
    return response.data; // Giả sử response trả về dữ liệu về trạng thái thành công hoặc thất bại
  } catch (error) {
    console.error("Lỗi khi thay đổi thông tin:", error);
    throw error; // Nếu có lỗi, ném lại để xử lý sau
  }
};
