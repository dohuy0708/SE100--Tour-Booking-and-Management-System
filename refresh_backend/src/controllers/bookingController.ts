import { createBooking, deleteBookingById, updateBookingById, getBookings, getBookingByIdWithDetails, BookingModel   } from "../db/booking";
import express from "express";

export const getAllBookings = async (req: express.Request, res: express.Response) => {

    try{
            const bookings=await getBookings();
            return res.status(200).json(bookings).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewBooking = async (req: express.Request, res: express.Response) =>{

    try{
        const {customer, tour,date, price, stt,number_slot}=req.body;

        if(!customer||!tour||!date||!price||!stt||number_slot){
            return res.status(400).json({message:'Thiếu thông tin Booking'}).end();
        }

        const booking= await createBooking({
            customer_id: customer,
            tour_id: tour,
            booking_date: date,
            total_price: price,
            status: stt,
            number_slots: number_slot
        });

        return res.status(200).json(booking).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const updateBooking = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {customer_id, tour_id,date, price, status}=req.body;

        if(!customer_id||!tour_id||!date||!price||!status){
            return res.status(400).json({message:'Thiếu thông tin Booking'}).end();
        }

        const booking= await updateBookingById(id, {customer_id, tour_id,date, price, status});

        if(!booking){
            return res.status(400).json({message:'Booking không tồn tại'}).end();
        }
        await booking.save();

        return res.status(200).json(booking).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const deleteBooking = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;
        const booking=await deleteBookingById(id);
        if(!booking){
            return res.status(400).json({message:'Booking không tồn tại'}).end();
        }
        return res.status(200).json(booking).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}


export const getBookingByIdWithTheDetails = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const booking = await getBookingByIdWithDetails(id) ;
        if (booking==undefined||booking==null) {
            return res.status(404).json({ message: 'Booking không tồn tại' }).end();
        }
        return res.status(200).json(booking).end();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Lỗi' }).end();
    }
}
export const getToursByCustomerId = async (req: express.Request, res: express.Response) => {
    try {
      const customer_id = req.params.customer_id; 
  
      const bookings = await BookingModel.find({ customer_id })
        .populate('tour_id'); 
  
      if (bookings.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy tour cho khách hàng này' });
      }
  
      const tours = bookings.map(booking => booking.tour_id);
  
      return res.status(200).json(tours);
    } catch (error) {
      console.error('Error in getToursByCustomerId:', error);
      return res.status(500).json({ message: 'Lỗi khi lấy tour cho khách hàng', error });
    }
  };
