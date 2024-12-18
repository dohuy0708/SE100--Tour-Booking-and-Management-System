import { createTour, deleteTourById, updateTourById, getTourByCode, getTours} from "db/tour";
import express from "express";

export const getAllTours = async (req: express.Request, res: express.Response) => {

    try{
            const tours=await getTours();
            return res.status(200).json(tours).end();
        }
        catch(error){
            console.log(error);
            return res.sendStatus(400).json({message:'Lỗi'}).end();
        }
}

export const createNewTour = async (req: express.Request, res: express.Response) =>{

    try{
        const {tour_name, tour_code, tour_type, duration, description, policy_id}=req.body;

        if(!tour_name||!tour_code||!tour_type||!duration||!description||!policy_id){
            return res.sendStatus(400).json({message:'Thiếu thông tin Tour'}).end();
        }

        const tour= await createTour({
            tour_name,
            tour_code,
            tour_type,
            duration,
            description,
            policy_id,
        });

        return res.status(200).json(tour).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}

export const updateTour = async (req: express.Request, res: express.Response) =>{

    try{
        const {id}=req.params;  
        const {tour_name, tour_code, tour_type, duration, description, policy_id}=req.body;

        if(!tour_name||!tour_code||!tour_type||!duration||!description||!policy_id){
            return res.sendStatus(400).json({message:'Thiếu thông tin Tour'}).end();
        }

        const tour= await updateTourById(id, {tour_name, tour_code, tour_type, duration, description, policy_id});

        if(!tour){
            return res.sendStatus(400).json({message:'Tour không tồn tại'}).end();
        }
        await tour.save();

        return res.status(200).json(tour).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}

export const deleteTour = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;
        const deleteTour= await deleteTourById(id);
        return res.status(200).json(deleteTour).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}

export const getTourByTourCode = async (req: express.Request, res: express.Response) =>{
    try{
        const {tour_code}=req.body;
        const tour= await getTourByCode(tour_code);
        return res.status(200).json(tour).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}