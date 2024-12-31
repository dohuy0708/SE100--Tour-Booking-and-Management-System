import { createNewBooking, deleteBooking, updateBooking, getAllBookings, getBookingByIdWithTheDetails, getSchedulesByCustomerId } from '../controllers/bookingController';
import express from 'express';

export default (router: express.Router) => {
    
    router.post('/bookings', createNewBooking as any);
    router.patch('/bookings/:id', updateBooking as any);
    router.delete('/bookings/:id', deleteBooking as any);
    router.get('/bookings', getAllBookings as any);
    router.get('/bookings/:id', getBookingByIdWithTheDetails as any);
    router.get('/bookings/customer/:customer_id', getSchedulesByCustomerId as any);
}