import { createMedia, updateMediaById, deleteMediaById, getMedias } from "../db/tour_media";
import express from "express";

export const getAllMedias = async (req: express.Request, res: express.Response) => {

    try{
            const medias=await getMedias();
            return res.status(200).json(medias).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewMedia = async (req: express.Request, res: express.Response) =>{

    try{
        const {tour_id, cover, image1,image2, image3,image4,image5,image6}=req.body;

        if(!tour_id||!cover){
            return res.status(400).json({message:'Thiếu thông tin Media'}).end();
        }

        const media= await createMedia({
            tour_id,
            cover,
            image1,
            image2,
            image3,
            image4,
            image5,
            image6,
        });

        return res.status(200).json(media).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const updateMedia = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {tour_id, cover, image1,image2, image3,image4,image5,image6}=req.body;

        if(!tour_id||!cover){
            return res.status(400).json({message:'Thiếu thông tin Media'}).end();
        }

        const media= await updateMediaById(id, {tour_id, cover, image1,image2, image3,image4,image5,image6});

        if(!media){
            return res.status(400).json({message:'Media không tồn tại'}).end();
        }
        await media.save();

        return res.status(200).json(media).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const deleteMedia = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;
        const deleteMedia= await deleteMediaById(id);
        return res.status(200).json(deleteMedia).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();     
    }
}