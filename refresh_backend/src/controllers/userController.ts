import { deleteUserById, getUserById, getUsers } from './../db/user';
import express from 'express';

export const getAllUsers = async (req: express.Request, res: express.Response)=> {
    try{
        const users=await getUsers();
        return res.status(200).json(users).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}


export const deleteUser=async(req:express.Request, res:express.Response)=>{
    try{
        const {id}=req.params;
        const deleteUser= await deleteUserById(id);
        return res.status(200).json(deleteUser).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}

export const updateUser=async(req:express.Request, res:express.Response)=>{
    try{
        const {id}=req.params;  
        const {username}=req.body;

        if(!username){
            return res.sendStatus(400).json({message:'Thiếu thông tin User'}).end();
        }

        const user= await getUserById(id);

        if(!user){
            return res.sendStatus(400).json({message:'User không tồn tại'}).end();
        }
        user.user_name=username;
        await user.save();

        return res.status(200).json(user).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}