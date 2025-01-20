import { createLocation, updateLocationById, deleteLocationById, getLocations } from "db/location";
import express from "express";

export const getAllLocations = async (req: express.Request, res: express.Response) => {

    try{
            const locations=await getLocations();
            return res.status(200).json(locations).end();
        }
        catch(error){
            console.log(error);
            return res.sendStatus(400).json({message:'Lỗi'}).end();
        }
}

export const createNewLocation = async (req: express.Request, res: express.Response) =>{

    try{
        const {location_name, address}=req.body;

        if(!location_name||!address){
            return res.sendStatus(400).json({message:'Thiếu thông tin Location'}).end();
        }

        const location= await createLocation({
            location_name,
            address,
        });

        return res.status(200).json(location).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}

export const updateLocation = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {location_name, address}=req.body;

        if(!location_name||!address){
            return res.sendStatus(400).json({message:'Thiếu thông tin Location'}).end();
        }

        const location= await updateLocationById(id, {location_name, address});

        if(!location){
            return res.sendStatus(400).json({message:'Location không tồn tại'}).end();
        }
        await location.save();

        return res.status(200).json(location).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}

export const deleteLocation = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;

        const location= await deleteLocationById(id);

        if(!location){
            return res.sendStatus(400).json({message:'Location không tồn tại'}).end();
        }

        return res.status(200).json(location).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}