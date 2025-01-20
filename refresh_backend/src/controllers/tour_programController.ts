import { createProgram, updateProgramById, deleteProgramById, getPrograms } from "db/tour_program";
import express from "express";

export const getAllPrograms = async (req: express.Request, res: express.Response) => {

    try{
            const programs=await getPrograms();
            return res.status(200).json(programs).end();
        }
        catch(error){
            console.log(error);
            return res.sendStatus(400).json({message:'Lỗi'}).end();
        }
}

export const createNewProgram = async (req: express.Request, res: express.Response) =>{

    try{
        const {tour_id, day, description}=req.body;

        if(!tour_id||!day||!description){
            return res.sendStatus(400).json({message:'Thiếu thông tin Program'}).end();
        }

        const program= await createProgram({
            tour_id,
            day,
            description,
        });

        return res.status(200).json(program).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}

export const updateProgram = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {tour_id, day, description}=req.body;

        if(!tour_id||!day||!description){
            return res.sendStatus(400).json({message:'Thiếu thông tin Program'}).end();
        }

        const program= await updateProgramById(id, {tour_id, day, description});

        if(!program){
            return res.sendStatus(400).json({message:'Program không tồn tại'}).end();
        }
        await program.save();

        return res.status(200).json(program).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}

export const deleteProgram = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;
        const program= await deleteProgramById(id);

        if(!program){
            return res.sendStatus(400).json({message:'Program không tồn tại'}).end();
        }

        return res.status(200).json(program).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}