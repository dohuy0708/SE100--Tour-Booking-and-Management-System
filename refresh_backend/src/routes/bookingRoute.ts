import { createNewBooking, deleteBooking, updateBooking, getAllBookings } from './../controllers/bookingController';
import express from 'express';

export default (router: express.Router) => {
    
    router.post('/bookings', createNewBooking as any);
    router.patch('/bookings/:id', updateBooking as any);
    router.delete('/bookings/:id', deleteBooking as any);
    router.get('/bookings', getAllBookings as any);
}