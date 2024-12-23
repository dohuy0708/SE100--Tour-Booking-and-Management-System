import { createPrice, updatePriceById, deletePriceById, getPrices } from "../db/tour_price";
import express from "express";

export const getAllPrices = async (req: express.Request, res: express.Response) => {

    try{
            const prices=await getPrices();
            return res.status(200).json(prices).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewPrice = async (req: express.Request, res: express.Response) =>{
    try{
        const {tour, a_price,c_price,i_price}=req.body;

        if(tour==null||a_price==null||c_price==null||i_price==null||tour==undefined||a_price==undefined||c_price==undefined||i_price==undefined){
            return res.status(400).json({message:'Thiếu thông tin Price'}).end();
        }

        const price= await createPrice({
            tour_id:tour,
            adult_price:a_price,
            children_price:c_price,
            infant_price:i_price,
        });

        return res.status(200).json(price).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const updatePrice = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {tour, a_price,c_price,i_price}=req.body;

        if(tour==null||a_price==null||c_price==null||i_price==null||tour==undefined||a_price==undefined||c_price==undefined||i_price==undefined){
            return res.status(400).json({message:'Thiếu thông tin Price'}).end();
        }

        const price= await updatePriceById(id, {tour, a_price,c_price,i_price});

        if(!price){
            return res.status(400).json({message:'Price không tồn tại'}).end();
        }
        await price.save();

        return res.status(200).json(price).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const deletePrice = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;
        const price= await deletePriceById(id);

        if(!price){
            return res.status(400).json({message:'Price không tồn tại'}).end();
        }

        return res.status(200).json(price).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}