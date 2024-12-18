import { getBookings } from "../../../services/bookingService";
import { getSchedules } from "../../../services/scheduleService";
import { getTours } from "../../../services/tourService";
import { getUsers } from "../../../services/userService";

export const getCustomerData = async () => {
  try {
    const [customers, bookings, tours, schedules] = await Promise.all([
      getUsers(),
      getBookings(),
      getTours(),
      getSchedules(),
    ]);

    const enrichedCustomers = customers.map((customer) => {
      // Đếm số lượng bookings có `customer_id` khớp với `userId`
      const totalBookings = bookings.filter(
        (booking) => booking.customerId === customer.userId
      ).length;

      return {
        id: customer.userId,
        name: customer.name,
        email: customer.email,
        phone: customer.phoneNumber,
        birthday: customer.dateOfBirth,
        total_bookings: totalBookings || 0,
      };
    });

    return { customers: enrichedCustomers };
  } catch (error) {
    console.error("Error loading booking data:", error);
    throw error;
  }
};
