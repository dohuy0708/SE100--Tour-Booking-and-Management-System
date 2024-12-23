import { createBookingDetail, deleteBookingDetailById, updateBookingDetailById, getBookingDetails } from "../db/booking_detail";
import express from "express";

export const getAllBookingDetails = async (req: express.Request, res: express.Response) => {
    
    try{
            const booking_details=await getBookingDetails();
            return res.status(200).json(booking_details).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewBookingDetail = async (req: express.Request, res: express.Response) =>{
    try{
        const {booking, passenger, slottype}=req.body;

        if(booking==null||passenger==null||slottype==null||booking==undefined||passenger==undefined||slottype==undefined){
            return res.status(400).json({message:'Thiếu thông tin Booking Detail'}).end();
        }

        const booking_detail= await createBookingDetail({
            booking_id:booking,
            passenger_id:passenger,
            slot_type:slottype,
        });

        return res.status(200).json(booking_detail).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const updateBookingDetail = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {booking, passenger, slottype}=req.body;

        if(!booking||!passenger||!slottype){
            return res.status(400).json({message:'Thiếu thông tin Booking Detail'}).end();
        }

        const booking_detail= await updateBookingDetailById(id, {
            booking_id:booking,
            passenger_id:passenger,
            slot_type:slottype,
        });

        if(!booking_detail){
            return res.status(400).json({message:'Booking Detail không tồn tại'}).end();
        }
        await booking_detail.save();

        return res.status(200).json(booking_detail).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const deleteBookingDetail = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;
        const booking_detail=await deleteBookingDetailById(id);
        if(!booking_detail){
            return res.status(400).json({message:'Booking Detail không tồn tại'}).end();
        }
        return res.status(200).json(booking_detail).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}