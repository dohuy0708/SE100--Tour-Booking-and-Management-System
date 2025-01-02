import { createBooking, deleteBookingById, updateBookingById, getBookings, getBookingByIdWithDetails, BookingModel   } from "../db/booking";
import { getScheduleById } from "../db/schedule";
import { getPriceByTourId, TourPriceModel } from "../db/tour_price";
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
        const {customer, schedule, date, price, stt, number_slot} = req.body;

        if(!customer || !schedule || !date || !price || !stt || !number_slot){
            return res.status(400).json({message:'Thiếu thông tin Booking'}).end();
        }

        const scheduledt = await getScheduleById(schedule).populate('tour_id').lean();

        if(!scheduledt){
            return res.status(400).json({message:'Schedule không tồn tại'}).end();
        }


        const tprice= await TourPriceModel.findOne({tour_id: scheduledt.tour_id});

        if(!tprice){
            return res.status(400).json({message:'Giá Tour không tồn tại'}).end();
        }


        const bookingData= {
            customer_id: customer,
            schedule_id: schedule,
            booking_date: date,
            total_price: price,
            status: stt,
            number_slots: number_slot,
            schedule_details: scheduledt,
            tour_details: scheduledt.tour_id,
            adult_price: tprice.adult_price,
            children_price: tprice.children_price,
            infant_price: tprice.infant_price,
        };

        const booking = await createBooking(bookingData);

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
        const {customer_id, schedule_id,date, price, status}=req.body;

        if(!customer_id||!schedule_id||!date||!price||!status){
            return res.status(400).json({message:'Thiếu thông tin Booking'}).end();
        }

        const booking= await updateBookingById(id, {customer_id, schedule_id,date, price, status});

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
export const getSchedulesByCustomerId = async (req: express.Request, res: express.Response) => {
    try {
      const customer_id = req.params.customer_id; 
  
      const bookings = await BookingModel.find({ customer_id })
        .populate('schedule_id'); 
  
      if (bookings.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy Schedule cho khách hàng này' });
      }
  
      const schedules = bookings.map(booking => booking.schedule_id);
  
      return res.status(200).json(schedules);
    } catch (error) {
      console.error('Error in getScheduleByCustomerId:', error);
      return res.status(500).json({ message: 'Lỗi khi lấy Schedule cho khách hàng', error });
    }
  };
  export const getBookingByCustomerId = async (req: express.Request, res: express.Response) => {
    try {
      const customer_id = req.params.customer_id; 
  
      const bookings = await BookingModel.find({ customer_id })
      .populate({
        path: 'schedule_id',
        populate: {
            path: 'tour_id', 
        },
    });
  
      if (bookings.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy Booking cho khách hàng này' });
      }
  
      return res.status(200).json(bookings);
    } catch (error) {
      console.error('Error in getScheduleByCustomerId:', error);
      return res.status(500).json({ message: 'Lỗi khi lấy Booking cho khách hàng', error });
    }
  };
