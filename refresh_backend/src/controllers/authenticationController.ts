import { authentication } from './../helpers/index';
import express from 'express';
import { random, randomCode } from '../helpers';
import { getUserByEmail, createUser, getUserById, getUserBySessionToken} from '../db/user';
import { sendEmail } from '../helpers/mail_helper';
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

        if(!user.authentication.isVerified){
            return res.status(403).json({message:'Tài khoản chưa được xác thực'});
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
        const Code=randomCode();//Ma xac thuc


        const user=await createUser({
            email: mail,
            user_name: name,
            phone_number: phone,
            date_of_birth: dob,
            authentication:{
                salt: salte,
                user_password:authentication(salte, pass),
                sessionToken:null,
                verificationCode:Code,
                isVerified:false,
            },
            role:'CUSTOMER',
            group_id:'6768b9ca67d4dd30bb05e411',
        });

        const subject = 'Xác thực tài khoản của bạn';
        const content = 'Xin chào,' +name+'\n\n'+'Cảm ơn bạn đã đăng ký tài khoản tại 5H Tourist. Mã xác thực của bạn là: '+Code+'\n\n'+'Vui lòng nhập mã này để hoàn tất quá trình đăng ký.';



        sendEmail(mail, subject, content).catch(err => {
            console.error('Lỗi khi gửi email:', err); // Log lỗi nếu gửi email thất bại
        });

        return res.status(200).json({ message: 'Đăng ký thành công, vui lòng kiểm tra email để xác minh tài khoản', userId:user._id });
    }
    catch(error){
        console.log(error, 'Lỗi khi tạo người dùng');
        return res.status(400);
    }
}


export const staffregister=async(req:express.Request, res:express.Response):Promise<any>=>{
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
        const Code=randomCode();//Ma xac thuc


        const user=await createUser({
            email: mail,
            user_name: name,
            phone_number: phone,
            date_of_birth: dob,
            authentication:{
                salt: salte,
                user_password:authentication(salte, pass),
                sessionToken:null,
                verificationCode:Code,
                isVerified:true,
            },
            role:'STAFF',
            group_id:'6768b9dd67d4dd30bb05e413',
        });

        const subject = 'Tài khoản nhân viên của bạn';
        const content = 'Xin chào,' +name+'\n\n'+'Cảm ơn bạn đã đăng ký tài khoản nhân viên tại 5H Tourist.'// Mã xác thực của bạn là: '+Code+'\n\n'+'Vui lòng nhập mã này để hoàn tất quá trình đăng ký.';



        sendEmail(mail, subject, content).catch(err => {
            console.error('Lỗi khi gửi email:', err); // Log lỗi nếu gửi email thất bại
        });

        return res.status(200).json({ message: 'Đăng ký thành công, vui lòng kiểm tra email để xác minh tài khoản', userId:user._id });
    }
    catch(error){
        console.log(error, 'Lỗi khi tạo người dùng');
        return res.status(400);
    }
}




export const verifyUser=async(req:express.Request, res:express.Response):Promise<any>=>{
    try{
        const {mail, code}=req.body;

        if(mail==undefined||code==undefined||mail==null||code==null){
            return res.status(400).json({message:'Thiếu thông tin'});
        }

        const user=await getUserByEmail(mail).select('+authentication.verificationCode');

        if(!user){
            return res.status(404).json({message:'User không tồn tại'});
        }

        const realcode=parseInt(code);

        if(user.authentication.verificationCode!==realcode){
            return res.status(403).json({message:user.authentication.verificationCode});
        }

        user.authentication.isVerified=true;
        user.authentication.verificationCode=undefined;//Xoa ma xac thuc

        await user.save();

        return res.status(200).json({message:'Xác thực thành công'});
    }
    catch(error){
        console.log(error, 'Lỗi khi xác thực tài khoản');
        return res.status(400).json({message:'Lỗi trong quá trình xác thực tài khoản'});
    }
}



export const verifyStaff=async(req:express.Request, res:express.Response):Promise<any>=>{
    try{
        const {mail, code}=req.body;

        if(mail==undefined||code==undefined||mail==null||code==null){
            return res.status(400).json({message:'Thiếu thông tin'});
        }

        const user=await getUserByEmail(mail).select('+authentication.verificationCode');

        if(!user){
            return res.status(404).json({message:'Staff không tồn tại'});
        }

        const realcode=parseInt(code);

        if(user.authentication.verificationCode!==realcode){
            return res.status(403).json({message:user.authentication.verificationCode});
        }

        user.authentication.isVerified=true;
        user.authentication.verificationCode=undefined;//Xoa ma xac thuc

        await user.save();

        return res.status(200).json({message:'Xác thực thành công'});
    }
    catch(error){
        console.log(error, 'Lỗi khi xác thực tài khoản');
        return res.status(400).json({message:'Lỗi trong quá trình xác thực tài khoản'});
    }
}

export const resendverifyUser=async(req:express.Request, res:express.Response):Promise<any>=>{
    try{
        const  {mail}=req.body;
        if(!mail){
            return res.status(400).json({message:'Thiếu thông tin mail'});
        }

        const user=await getUserByEmail(mail);
        if(!user){
            return res.status(404).json({message:'Email không tồn tại trong hệ thống'});
        }
        const newCode=randomCode();
        user.authentication.verificationCode=newCode;
        await user.save();

        const subject = 'Xác thực tài khoản của bạn';
        const content = 'Xin chào,'+'\n\n'+'Cảm ơn bạn đã đăng ký tài khoản tại 5H Tourist. Mã xác thực của bạn là: '+newCode+'\n\n'+'Vui lòng nhập mã này để hoàn tất quá trình đăng ký.';



        sendEmail(mail, subject, content).catch(err => {
            console.error('Lỗi khi gửi email:', err); // Log lỗi nếu gửi email thất bại
        });

        return res.status(200).json({message:'Gửi lại mã xác thực thành công, vui lòng kiểm tra email'});
    }
    catch(error){
        console.log(error, 'Lỗi khi gửi lại mã xác thực');
        return res.status(400).json({message:'Lỗi trong quá trình gửi lại mã xác thực'});
    }
}

export const logout = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const sessionToken=req.cookies['5H-AUTH'];
        if(!sessionToken){
            return res.status(400).json({message:'Chưa đăng nhập hoặc không tìm thấy sessionToken'});
        }
        const user=await getUserBySessionToken(sessionToken);
        if(!user){
            return res.status(404).json({message:'Phiên đăng nhập không hợp lệ'});
        }

        user.authentication.sessionToken=null;
        await user.save();
        res.clearCookie('5H-AUTH',{ domain:'localhost', path:'/'});

        return res.status(200).json({message:'Đăng xuất thành công'});

    }
    catch(error){
        console.log(error, 'Lỗi khi đăng xuất');
        return res.status(400).json({message:'Lỗi trong quá trình đăng xuất'});
    }
}

export const forgetpassword=async(req:express.Request, res:express.Response):Promise<any>=>{
    try{
        const {mail}=req.body;
        if(!mail){
            return res.status(400).json({message:'Thiếu thông tin mail'});
        }

        const user=await getUserByEmail(mail);
        if(!user){
            return res.status(404).json({message:'Email không tồn tại trong hệ thống'});
        }

        const Code=randomCode();

        user.authentication.resetCode=Code;
        await user.save();

        const subject = 'Đặt lại mật khẩu';
        const content = 'Xin chào '+ user.user_name+',\n\nBạn đã yêu cầu đặt lại mật khẩu tại 5H Tourist. Mã xác thực của bạn là: '+Code+'\n\nVui lòng nhập mã này để đặt lại mật khẩu.';

        sendEmail(mail, subject, content).catch(err => {
            console.error('Lỗi khi gửi email:', err);
        });

        return res.status(200).json({message:'Gửi mã để đặt lại mật khẩu thành công, vui lòng kiểm tra email'});
    }
    catch(error){
        console.log('Lỗi khi yêu cầu đặt lại mật khẩu: ', error);
        return res.status(400).json({message:'Lỗi trong quá trình yêu cầu đặt lại mật khẩu'});
    }
}


export const resetpassword=async(req:express.Request, res:express.Response):Promise<any>=>{
    try{
        const {mail, code, pass}=req.body;
        if(!mail||!code||!pass){
            return res.status(400).json({message:'Thiếu thông tin'});
        }

        const user=await getUserByEmail(mail).select('+authentication.resetCode');
        if(!user){
            return res.status(404).json({message:'Email không tồn tại trong hệ thống'});
        }

        if(user.authentication.resetCode!==parseInt(code)){
            return res.status(403).json({message:'Mã xác thực không đúng'});
        }

        const salte=random();


        user.authentication.salt=salte;  
        user.authentication.user_password=authentication(salte, pass);

        user.authentication.resetCode=undefined;

        await user.save();

        return res.status(200).json({message:'Đặt lại mật khẩu thành công'});
    }
    catch(error){
        console.log('Lỗi khi đặt lại mật khẩu: ', error);
        return res.status(400).json({message:'Lỗi trong quá trình đặt lại mật khẩu'});
    }
}



