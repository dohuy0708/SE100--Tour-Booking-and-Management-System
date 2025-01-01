import { createUser, deleteUserById, getUserById, getUsers } from '../db/user';
import express from 'express';
import { authentication, random } from '../helpers';

export const getAllUsers = async (req: express.Request, res: express.Response)=> {
    try{
        const users=await getUsers();
        return res.status(200).json(users).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
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
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const updateUser=async(req:express.Request, res:express.Response)=>{
    try{
        const {id}=req.params;  
        const {name}=req.body;

        if(name==null||name==undefined){
            return res.status(400).json({message:'Thiếu thông tin User'}).end();
        }

        const user= await getUserById(id);

        if(!user){
            return res.status(400).json({message:'User không tồn tại'}).end();
        }
        user.user_name=name;
        await user.save();

        return res.status(200).json(user).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const createStaff = async (req: express.Request, res: express.Response) =>{
    try{
        const {name, email, phone, dob}=req.body;

        if(name==null||email==null||phone==null||dob==null||name==undefined||email==undefined||phone==undefined||dob==undefined){
            return res.status(400).json({message:'Thiếu thông tin Staff'}).end();
        }

         const salte=random();

         const pass=phone+'@123';

        const staff= await createUser({
            user_name: name,
            email: email,
            phone_number: phone,
            date_of_birth: dob,
            authentication:{
                user_password: authentication(pass, salte),
                isVerfiied: true,
                sessionToken:null,
                salt: salte,
            },
            role:'STAFF',
            group_id: '6768b9dd67d4dd30bb05e413',
        });

        return res.status(200).json(staff).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}