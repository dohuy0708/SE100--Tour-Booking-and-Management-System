import { createFeedback, deleteFeedbackById, updateFeedbackById, getFeedbacks, getFeedbackByIdWithDetails } from "../db/feedback";
import express from "express";

export const getAllFeedbacks = async (req: express.Request, res: express.Response) => {

    try{
            const feedbacks=await getFeedbacks();
            return res.status(200).json(feedbacks).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewFeedback = async (req: express.Request, res: express.Response) =>{

    try{    
        const {customer, schedule, content, date}=req.body;

        if(customer==null||schedule==null||content==null||date==null||customer==undefined||schedule==undefined||content==undefined||date==undefined){
            return res.status(400).json({message:'Thiếu thông tin Feedback'}).end();
        }

        const feedback= await createFeedback({
            customer_id: customer,
            schedule_id: schedule,
            feedback_content: content,
            feedback_date: date,
        });

        return res.status(200).json(feedback).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const updateFeedback = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {customer, schedule, content, date}=req.body;

        if(customer==null||schedule==null||content==null||date==null||customer==undefined||schedule==undefined||content==undefined||date==undefined){
            return res.status(400).json({message:'Thiếu thông tin Feedback'}).end();
        }

        const feedback= await updateFeedbackById(id, {
            customer_id: customer,
            tour_id: schedule,
            feedback_content: content,
            feedback_date: date,
        });

        if(!feedback){
            return res.status(400).json({message:'Feedback không tồn tại'}).end();
        }
        await feedback.save();

        return res.status(200).json(feedback).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const deleteFeedback = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;
        const feedback= await deleteFeedbackById(id);

        if(!feedback){
            return res.status(400).json({message:'Feedback không tồn tại'}).end();
        }

        return res.status(200).json(feedback).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}


export const getFeedbackByIdWithTheDetails = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const feedback = await getFeedbackByIdWithDetails(id) ;
        if (feedback==undefined||feedback==null) {
            return res.status(404).json({ message: 'Feedback không tồn tại' }).end();
        }
        return res.status(200).json(feedback).end();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Lỗi' }).end();
    }
}