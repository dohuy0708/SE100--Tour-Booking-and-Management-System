import { createMedia, updateMediaById, deleteMediaById, getMedias } from "../db/tour_media";
import express from "express";
import path from "path";

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
        const {tour}=req.body;

        if(!tour||!req.file){
            return res.status(400).json({message:'Thiếu thông tin Media'}).end();
        }

        const media= await createMedia({
            tour_id:tour,
            cover:'/assets/'+req.file.filename,
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
        const {tour}=req.body;

        if(!tour){
            return res.status(400).json({message:'Thiếu thông tin Media'}).end();
        }

        const values:Record<string, any>={tour_id:tour};

        if(req.file){
            values.cover='/assets/'+req.file.filename;//lay duong dan file anh neu co
        }

        const media= await updateMediaById(id, values);

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