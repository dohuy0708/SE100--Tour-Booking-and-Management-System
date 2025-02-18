import { createLocation, updateLocationById, deleteLocationById, getLocations } from "../db/location";
import express from "express";

export const getAllLocations = async (req: express.Request, res: express.Response) => {

    try{
            const locations=await getLocations();
            return res.status(200).json(locations).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewLocation = async (req: express.Request, res: express.Response) =>{

    try{
        const {name, code}=req.body;

        if(name==null||code==null||name==undefined||code==undefined){
            return res.status(400).json({message:'Thiếu thông tin Location'}).end();
        }

        const location= await createLocation({
            location_name: name,
            location_code:code,
        });

        return res.status(200).json(location).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const updateLocation = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {name, code}=req.body;

        if(name==null||code==null||name==undefined||code==undefined){
            return res.status(400).json({message:'Thiếu thông tin Location'}).end();
        }

        const location= await updateLocationById(id, {location_name:name, loaction_code:code});

        if(!location){
            return res.status(400).json({message:'Location không tồn tại'}).end();
        }
        await location.save();

        return res.status(200).json(location).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const deleteLocation = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;

        const location= await deleteLocationById(id);

        if(!location){
            return res.status(400).json({message:'Location không tồn tại'}).end();
        }

        return res.status(200).json(location).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}