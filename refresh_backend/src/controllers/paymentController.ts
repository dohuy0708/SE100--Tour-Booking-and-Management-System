import { createPayment, deletePaymentById, updatePaymentById, getPayments, PaymentMethods, PaymentModel } from "../db/payment";
import express from "express";
import querystring from 'qs';
import moment from 'moment';
import crypto from 'crypto';
import requestIp from 'request-ip';
import { env } from "process";
import { BookingModel } from "../db/booking";
import paymentRoute from "routes/paymentRoute";


export const getAllPayments = async (req: express.Request, res: express.Response) => {

    try{
            const payments=await getPayments();
            return res.status(200).json(payments).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewPayment = async (req: express.Request, res: express.Response) =>{

    try{
        const {booking, amount, date, method}=req.body;

        if(booking==null||amount==null||date==null||method==null||booking==undefined||amount==undefined||date==undefined||method==undefined){
            return res.status(400).json({message:'Thiếu thông tin Payment'}).end();
        }

        const payment= await createPayment({
            booking_id:booking,
            amount_paid:amount,
            payment_date:date,
            payment_method:method,
        });

        return res.status(200).json(payment).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const updatePayment = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {booking, amount, date, method}=req.body;

        if(booking==null||amount==null||date==null||method==null||booking==undefined||amount==undefined||date==undefined||method==undefined){
            return res.status(400).json({message:'Thiếu thông tin Payment'}).end();
        }

        const payment= await updatePaymentById(id, {
            booking_id:booking,
            amount_paid:amount,
            payment_date:date,
            payment_method:method,
        });

        if(!payment){
            return res.status(400).json({message:'Payment không tồn tại'}).end();
        }
        await payment.save();

        return res.status(200).json(payment).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const deletePayment = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  

        const payment= await deletePaymentById(id);

        if(!payment){
            return res.status(400).json({message:'Payment không tồn tại'}).end();
        }

        return res.status(200).json(payment).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}
export const createPaymentUrl = async (req: express.Request, res: express.Response) => {
    try {
        const {booking_id}=req.params;  
        process.env.TZ = 'Asia/Ho_Chi_Minh';

        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss');
        const ipAddr = req.clientIp

        const tmnCode: string = process.env.vnp_TmnCode;
        const secretKey: string = process.env.vnp_HashSecret;
        const vnpUrl: string = process.env.vnp_Url;
        const returnUrl: string = process.env.vnp_ReturnUrl;

        const booking = await BookingModel.findById(booking_id);

        if (!booking) {
            res.status(404).json({ message: 'Booking not found' });
            return;
        }        
        const total_price = parseFloat(booking.total_price.toString());
        const currCode = 'VND';

        const vnp_Params: Record<string, any> = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: tmnCode,
            vnp_Locale: "vn",
            vnp_CurrCode: currCode,
            vnp_TxnRef: booking_id,
            vnp_OrderInfo: `Thanh toan cho ma GD:${booking_id}`,
            vnp_OrderType: 'other',
            vnp_Amount: total_price * 100,
            vnp_ReturnUrl: returnUrl,
            vnp_IpAddr: ipAddr,
            vnp_CreateDate: createDate,
        };

        const sortedParams = sortObject(vnp_Params);
        const signData = querystring.stringify(sortedParams, { encode: false });
        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;

        const vnpUrlWithParams = `${vnpUrl}?${querystring.stringify(vnp_Params, { encode: false })}`;

        const payment = new PaymentModel({
            booking_id: booking._id,  // Lưu ID booking
            amount_paid: total_price,  // Dùng amount từ booking
            payment_date: date,  // Thời gian thanh toán
        });

        await payment.save();

        res.redirect(vnpUrlWithParams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const sortObject = (obj: Record<string, any>): Record<string, any> => {
    const sorted: Record<string, any> = {};
    Object.keys(obj)
        .sort()
        .forEach((key) => {
            sorted[key] = obj[key];
        });
    return sorted;
};
