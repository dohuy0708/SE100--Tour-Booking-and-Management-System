import { createPassenger, deletePassengerById, updatePassengerById, getPassengers } from "../db/passenger";
import express from "express";

export const getAllPassengers = async (req: express.Request, res: express.Response) => {
    
    try{
            const passengers=await getPassengers();
            return res.status(200).json(passengers).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewPassenger = async (req: express.Request, res: express.Response) =>{
    try{
        const {booking, name, date, type, passport}=req.body;
        if(name==null||date==null||type==null||name==undefined||date==undefined||type==undefined || booking==null || booking==undefined){
            return res.status(400).json({message:'Thiếu thông tin hành khách'}).end();
        }
        const passenger= await createPassenger({
            booking_id:booking,
            passenger_name:name,
            passenger_date:date,
            passenger_type:type,
            passport_number:passport,
        });
        return res.status(200).json(passenger).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const updatePassenger = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {name, age, type, passport}=req.body;
        if(name==null||age==null||type==null||name==undefined||age==undefined||type==undefined){
            return res.status(400).json({message:'Thiếu thông tin hành khách'}).end();
        }
        const passenger= await updatePassengerById(id, {
            //booking_id,
            passenger_name:name,
            passenger_age:age,
            passenger_type:type,
            passport_number:passport,
        });
        if(!passenger){
            return res.status(400).json({message:'Hành khách không tồn tại'}).end();
        }
        await passenger.save();
        return res.status(200).json(passenger).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const deletePassenger = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;
        const passenger= await deletePassengerById(id);
        if(!passenger){
            return res.status(400).json({message:'Hành khách không tồn tại'}).end();
        }
        return res.status(200).json(passenger).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

