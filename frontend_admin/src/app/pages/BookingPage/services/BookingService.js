import { bookingData } from "../../../../mocks/BookingData.js"; // Import dữ liệu mẫu

export const getBookingData = async ({
  filters = {},
  page = 1,
  limit = 10,
}) => {
  try {
    // Lọc dữ liệu nếu có điều kiện lọc
    let filteredData = bookingData;

    if (Object.keys(filters).length > 0) {
      filteredData = bookingData.filter((booking) => {
        let isMatch = true;
        // Lọc theo mỗi key trong filters
        for (let key in filters) {
          if (filters[key] && booking[key] !== filters[key]) {
            isMatch = false;
            break;
          }
        }
        return isMatch;
      });
    }

    // Phân trang dữ liệu
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Booking data loaded:", paginatedData);
        resolve(bookingData); // Trả về dữ liệu đã lọc và phân trang
      }, 500); // Mô phỏng thời gian tải
    });
  } catch (error) {
    console.error("Error loading booking data:", error);
    throw error;
  }
};
