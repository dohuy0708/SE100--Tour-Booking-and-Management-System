import { createPassenger, deletePassengerById, updatePassengerById, getPassengers } from "db/passenger";
import express from "express";

export const getAllPassengers = async (req: express.Request, res: express.Response) => {
    
    try{
            const passengers=await getPassengers();
            return res.status(200).json(passengers).end();
        }
        catch(error){
            console.log(error);
            return res.sendStatus(400).json({message:'Lỗi'}).end();
        }
}

export const createNewPassenger = async (req: express.Request, res: express.Response) =>{
    try{
        const {booking_id,name, age, type, passport}=req.body;
        if(!booking_id||!name||!age||!type){
            return res.sendStatus(400).json({message:'Thiếu thông tin hành khách'}).end();
        }
        const passenger= await createPassenger({
            booking_id,
            passenger_name:name,
            passenger_age:age,
            passenger_type:type,
            passport_number:passport,
        });
        return res.status(200).json(passenger).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}

export const updatePassenger = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {booking_id,name, age, type, passport}=req.body;
        if(!booking_id||!name||!age||!type){
            return res.sendStatus(400).json({message:'Thiếu thông tin hành khách'}).end();
        }
        const passenger= await updatePassengerById(id, {
            booking_id,
            passenger_name:name,
            passenger_age:age,
            passenger_type:type,
            passport_number:passport,
        });
        if(!passenger){
            return res.sendStatus(400).json({message:'Hành khách không tồn tại'}).end();
        }
        await passenger.save();
        return res.status(200).json(passenger).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}

export const deletePassenger = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;
        const passenger= await deletePassengerById(id);
        if(!passenger){
            return res.sendStatus(400).json({message:'Hành khách không tồn tại'}).end();
        }
        return res.status(200).json(passenger).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}

