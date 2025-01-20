import multer from 'multer';
import path from 'path';
import { Request } from 'express';



//cau hinh multer
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(process.cwd(),'public/assets'));//luu file vao thu muc assets
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null,uniqueSuffix+path.extname(file.originalname));//ten file duy nhat sau khi upload
    }
});

//kiem tra file upload co phai la file anh hay khong
const fileFilter=(
    req:Request,
    file:Express.Multer.File,
    cb: multer.FileFilterCallback
)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null,true);//cho phep upload file anh
    }else{
        cb(new Error('File không phải là ảnh'));
    }
}

//upload file anh

const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:1024*1024*5//gioi han kich thuoc file anh 5MB
    }
});

export default upload;