import { createPayment, deletePaymentById, updatePaymentById, getPayments } from "../db/payment";
import express from "express";

export const getAllPayments = async (req: express.Request, res: express.Response) => {

    try{
            const payments=await getPayments();
            return res.status(200).json(payments).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewPayment = async (req: express.Request, res: express.Response) =>{

    try{
        const {booking, amount, date, method}=req.body;

        if(booking==null||amount==null||date==null||method==null||booking==undefined||amount==undefined||date==undefined||method==undefined){
            return res.status(400).json({message:'Thiếu thông tin Payment'}).end();
        }

        const payment= await createPayment({
            booking_id:booking,
            amount_paid:amount,
            payment_date:date,
            payment_method:method,
        });

        return res.status(200).json(payment).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const updatePayment = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {booking, amount, date, method}=req.body;

        if(booking==null||amount==null||date==null||method==null||booking==undefined||amount==undefined||date==undefined||method==undefined){
            return res.status(400).json({message:'Thiếu thông tin Payment'}).end();
        }

        const payment= await updatePaymentById(id, {
            booking_id:booking,
            amount_paid:amount,
            payment_date:date,
            payment_method:method,
        });

        if(!payment){
            return res.status(400).json({message:'Payment không tồn tại'}).end();
        }
        await payment.save();

        return res.status(200).json(payment).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const deletePayment = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  

        const payment= await deletePaymentById(id);

        if(!payment){
            return res.status(400).json({message:'Payment không tồn tại'}).end();
        }

        return res.status(200).json(payment).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}
