import { createRole, updateRoleById, deleteRoleById, getRoles } from "../db/role";
import express from "express";

export const getAllRoles = async (req: express.Request, res: express.Response) => {
    try{
            const roles=await getRoles();
            return res.status(200).json(roles).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}
export const createNewRole = async (req: express.Request, res: express.Response) =>{
    try{
        const {role_name, description, url}=req.body;

        if(!role_name||!description){
            return res.status(400).json({message:'Thiếu thông tin Role'}).end();
        }

        const role= await createRole({
            role_name,
            description,
            url,
        });

        return res.status(200).json(role).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const updateRole = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {role_name}=req.body;

        if(!role_name){
            return res.status(400).json({message:'Thiếu thông tin Role'}).end();
        }

        const role= await updateRoleById(id, {role_name});

        if(!role){
            return res.status(400).json({message:'Role không tồn tại'}).end();
        }
        await role.save();

        return res.status(200).json(role).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const deleteRole = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;
        const deleteRole= await deleteRoleById(id);
        return res.status(200).json(deleteRole).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}