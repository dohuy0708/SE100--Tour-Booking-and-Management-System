import { createTourLocation, deleteTourLocation, getTourLocations } from "../db/tour_location";
import express from "express";


export const getAllTourLocations = async (req: express.Request, res: express.Response) => {
    try{
            const TourLocations=await getTourLocations();
            return res.status(200).json(TourLocations).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewTourLocation = async (req: express.Request, res: express.Response) =>{
    try{
        const {tour, location}=req.body;

        if(tour==null || location==null||tour==undefined || location==undefined){
            return res.status(400).json({message:'Thiếu thông tin Tour hoặc Location'}).end();
        }

        const TourLocation= await createTourLocation (tour, location);

        return res.status(200).json(TourLocation).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }

}

export const removeTourLocation = async (req: express.Request, res: express.Response) => {
    const { tour, location} = req.body;

    if (tour == null || location == null || tour == undefined || location == undefined) {
        return res.status(400).json({
            message: 'Thiếu thông tin Tour hoặc Location.',
            status: 'failed',
        });
    }

    try {
        const result = await deleteTourLocation(tour, location);

        if (result.status === 'NOT_FOUND') {
            return res.status(404).json(result); 
        }

        return res.status(200).json(result); 
    } catch (error) {
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi xóa quan hệ giữa Tour và Location.',
            status: 'failed',
            error: error.message,
        });
    }
}