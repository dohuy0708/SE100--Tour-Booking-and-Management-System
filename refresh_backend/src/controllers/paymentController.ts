import { createPayment, deletePaymentById, updatePaymentById, getPayments, PaymentMethods, PaymentModel } from "../db/payment";
import express from "express";
import querystring from 'qs';
import moment from 'moment';
import crypto from 'crypto';
import requestIp from 'request-ip';
import { env } from "process";
import { BookingModel } from "../db/booking";
import paymentRoute from "../routes/paymentRoute";
import { sortObject } from "../helpers/sort-object";
import dotenv from 'dotenv';


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
        const { booking_id } = req.params;
        process.env.TZ = 'Asia/Ho_Chi_Minh';

        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss');
        const ipAddr = requestIp.getClientIp(req);

        const tmnCode: string = process.env.vnp_TmnCode;
        const secretKey: string = process.env.vnp_HashSecret;
        let vnpUrl: string = process.env.vnp_Url;
        const returnUrl: string = process.env.vnp_returnvnpay;

        const booking = await BookingModel.findById(booking_id);

        if (!booking) {
            res.status(404).json({ message: 'Booking not found' });
            return;
        }

        const total_price = parseFloat(booking.total_price.toString());
        const currCode = 'VND';
        let vnp_Params: any = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = 'vn';
         vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = booking_id; ///Day la ma don hang trong db
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + booking_id;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = total_price * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl; //Thanh toan xong se refirect ve link nay
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;

        vnp_Params = sortObject(vnp_Params);

        const signData = querystring.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        const payment = new PaymentModel({
            booking_id: booking._id,
            amount_paid: total_price,
            payment_date: date,
            payment_method: "BANK_TRANSFER"
        });

        await payment.save();
        console.log('VNP Params:', vnpUrl);  

        res.json({ payment_url: vnpUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

