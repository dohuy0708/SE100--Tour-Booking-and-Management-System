import express from 'express';
import {get, merge} from 'lodash';
import {getUserBySessionToken} from '../db/user';

export const isAuthenticated=async(req:express.Request, res:express.Response,next: express.NextFunction)=>{
    try{
        const sessionToken=req.cookies['5H-AUTH'];
        if(!sessionToken){
            res.status(401).json({message:'Chưa từng đăng nhập'}).end();
            return;
        }
        const exitstingUser=await getUserBySessionToken(sessionToken);
        if(!exitstingUser){
            res.status(403).json({message:'Phiên đăng nhập không hợp lệ'}).end();
            return
        }
        merge(req, {indentity: exitstingUser});
        next();
    }
    catch(error){
        console.log("'Authentication error: ", error);
        res.status(500).json({message:'Internal server error'}).end();
    }
}

export const isOwner=async(req:express.Request, res:express.Response, next: express.NextFunction)=>{
    try{
        const {id}=req.params;
        const currentUserId=get(req, 'indentity._id') as string;

        if(!currentUserId){
            res.status(403).json({message:'Chưa đăng nhập'}).end();
            return;
        }
        if(currentUserId.toString()!==id){
            res.status(403).json({message:'Không có quyền'}).end();
            return;
        }
        next();
    }
    catch(error){   
        console.log(error);
        res.status(400).json({message:'Lỗi'}).end();
    }
}