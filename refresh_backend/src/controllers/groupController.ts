import { createGroup, updateGroupById, deleteGroupById, getGroups } from "db/group";
import express from "express";

export const getAllGroups = async (req: express.Request, res: express.Response) => {

    try{
            const groups=await getGroups();
            return res.status(200).json(groups).end();
        }
        catch(error){
            console.log(error);
            return res.sendStatus(400).json({message:'Lỗi'}).end();
        }
}

export const createNewGroup = async (req: express.Request, res: express.Response) =>{
    try{
        const {name}=req.body;

        if(!name){
            return res.sendStatus(400).json({message:'Thiếu thông tin Group'}).end();
        }

        const group= await createGroup({
            group_name:name,
        });

        return res.status(200).json(group).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }

}

export const updateGroup = async (req: express.Request, res: express.Response) =>{

    try{
        const {id}=req.params;  
        const {group_name}=req.body;

        if(!group_name){
            return res.sendStatus(400).json({message:'Thiếu thông tin Group'}).end();
        }

        const group= await updateGroupById(id, {group_name});

        if(!group){
            return res.sendStatus(400).json({message:'Group không tồn tại'}).end();
        }
        await group.save();

        return res.status(200).json(group).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}

export const deleteGroup = async (req: express.Request, res: express.Response) =>{

    try{
        const {id}=req.params;
        const deleteGroup= await deleteGroupById(id);
        return res.status(200).json(deleteGroup).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}