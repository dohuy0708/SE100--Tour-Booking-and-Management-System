import { createBooking, deleteBookingById, updateBookingById, getBookings   } from "db/booking";
import express from "express";

export const getAllBookings = async (req: express.Request, res: express.Response) => {

    try{
            const bookings=await getBookings();
            return res.status(200).json(bookings).end();
        }
        catch(error){
            console.log(error);
            return res.sendStatus(400).json({message:'Lỗi'}).end();
        }
}

export const createNewBooking = async (req: express.Request, res: express.Response) =>{

    try{
        const {customer, tour,date, price, stt}=req.body;

        if(!customer||!tour||!date||!price||!stt){
            return res.sendStatus(400).json({message:'Thiếu thông tin Booking'}).end();
        }

        const booking= await createBooking({
            customer_id: customer,
            tour_id: tour,
            booking_date: date,
            total_price: price,
            status: stt,
        });

        return res.status(200).json(booking).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}

export const updateBooking = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {customer_id, tour_id,date, price, status}=req.body;

        if(!customer_id||!tour_id||!date||!price||!status){
            return res.sendStatus(400).json({message:'Thiếu thông tin Booking'}).end();
        }

        const booking= await updateBookingById(id, {customer_id, tour_id,date, price, status});

        if(!booking){
            return res.sendStatus(400).json({message:'Booking không tồn tại'}).end();
        }
        await booking.save();

        return res.status(200).json(booking).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}

export const deleteBooking = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;
        const booking=await deleteBookingById(id);
        if(!booking){
            return res.sendStatus(400).json({message:'Booking không tồn tại'}).end();
        }
        return res.status(200).json(booking).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}