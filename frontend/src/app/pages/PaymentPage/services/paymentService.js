import axios from "axios";
const API_BASE_URL = "http://localhost:8080";

export const handleCreateBooking = async (
  name,
  phone,
  mail,
  addr,
  schedule,
  date,
  price,
  stt,
  number_slot,
  method,
  passengers
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/bookings`,
      {
        name,
        phone,
        mail,
        addr,
        schedule,
        date,
        price,
        stt,
        number_slot,
        method,
        passengers,
      } // Dữ liệu gửi trong body
    );
    console.log("Phản hồi booking: ", response);
    return response.data;
  } catch (error) {
    console.log("lỗi: ", error);
    throw error.response ? error.response.data : error;
  }
};
