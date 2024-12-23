import { authentication } from '../helpers';
import express from 'express';
import { random } from '../helpers';
import { getUserByEmail, createUser} from '../db/user';
//import BaseError from '../helpers';




export const login=async(req:express.Request, res:express.Response):Promise<any>=>{
    try{
        const {mail, pass }=req.body;

        if(!mail||!pass){
            return res.status(400).json({message:'Email hoặc mật khẩu không được để trống'});
        }   

        const user = await getUserByEmail(mail)
             .select('+authentication.salt +authentication.user_password');
        if(!user){
           return res.status(400).json({message:'Email không tồn tại'});
        }   

        const expectedHash=authentication(user.authentication.salt, pass);

        if(user.authentication.user_password!==expectedHash){
            return res.status(403).json({message:'Mật khẩu không đúng'});
        }

        const salte=random();
        user.authentication.sessionToken=authentication(salte, user._id.toString());

        await user.save();

        res.cookie('5H-AUTH',user.authentication.sessionToken,{domain:'localhost', path:'/'});

        return res.status(200).json(user);

    }
    catch(error){
        console.log(error);
        return res.status(400);
    }
}

export const register=async(req:express.Request, res:express.Response):Promise<any>=>{
    try{
        const {mail, pass,name, phone, dob}=req.body;

        if(mail==undefined||!pass==undefined||!name==undefined||!phone==undefined||!dob==undefined||mail==null||pass==null||name==null||phone==null||dob==null){
            return res.status(400).json({message:'Thiếu thông tin'});
        }

        const existingUser =await getUserByEmail(mail);

        if(existingUser){
            return res.status(404).json({message:'Email đã tồn tại'});
        }

        const salte=random();
        const user=await createUser({
            email: mail,
            user_name: name,
            phone_number: phone,
            date_of_birth: dob,
            authentication:{
                salt: salte,
                user_password:authentication(salte, pass),
            },
        
        });

        return res.status(200).json(user);  
    }
    catch(error){
        console.log(error, 'Lỗi khi tạo người dùng');
        return res.status(400);
    }
}