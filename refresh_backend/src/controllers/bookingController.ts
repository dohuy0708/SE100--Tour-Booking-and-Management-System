import { searchSchedules } from './../db/schedule';
import { register } from './authenticationController';
import { Tour } from './../../../backend/src/models/tour_model';
import { getUserByEmail, createUser, getUserBySessionToken, getUserById, UserModel } from "../db/user";
import { createBooking, deleteBookingById, updateBookingById, getBookings, getBookingByIdWithDetails, BookingModel, getBookingById   } from "../db/booking";
import { getScheduleById, updateOneField, ScheduleModel } from "../db/schedule";
import { getPriceByTourId, TourPriceModel } from "../db/tour_price";
import express from "express";
import { random, randomCode, authentication } from "../helpers";
import { sendEmail } from '../helpers/mail_helper';
import { createPassenger, PassengerModel } from "../db/passenger";
import tourRoute from "routes/tourRoute";
import { getTourById, TourModel } from "../db/tour";
import path from 'path';
import { TourLocationModel } from '../db/tour_location';
import { LocationModel } from '../db/location';

export const getAllBookings = async (req: express.Request, res: express.Response) => {

    try{
            const bookings= await BookingModel.find().lean();

            const result= await Promise.all(
                bookings.map(async (booking) => {

                    const customer= await UserModel.findOne({_id:booking.customer_id}).lean();
                    const schedule= await ScheduleModel.findOne({_id:booking.schedule_id}).lean();
                    const tour = await TourModel.findOne({_id:schedule.tour_id}).lean();
                    const tourlocations= await TourLocationModel.find({tour_id: tour._id}).lean();
                    const locationId=tourlocations.map(location=>location.location_id);
                    const locations= await LocationModel.find({_id:{$in:locationId}}).lean();
                    const passengers=await PassengerModel.find({booking_id:booking._id}).lean();
                    return {
                        ...booking,
                        customer,
                        schedule_id: schedule._id,
                        tour_code: schedule.tour_code,
                        tour_image: schedule.tour_image,
                        schedule_date: schedule.departure_date,
                        locations,
                        passengers,
                    }
        
                })
            );
            //tra ket qua ve
            res.status(200).json(result).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewBooking = async (req: express.Request, res: express.Response) =>{
    try{
        const {name, phone, mail, dob, schedule, date, price, stt, number_slot, method, passengers} = req.body;

        if(name==null||phone==null||mail==null||dob==null||schedule==null||date==null||price==null||stt==null||number_slot==null||name==undefined||phone==undefined
            ||mail==undefined||dob==undefined||schedule==undefined||date==undefined||price==undefined||stt==undefined||number_slot==undefined||method==null||method==undefined||passengers==null||passengers==undefined){
            return res.status(400).json({message:'Thiếu thông tin Booking'}).end();
        }


        const bookingCode=randomCode();

        let coder=null as Number;
        let user=await getUserByEmail(mail);
        if(!user){
            const salte=random();
            const password=mail+'@123';
            const Code=randomCode();
            coder=Code;
            const newuser= await createUser({
                user_name: name,
                email: mail,
                phone_number: phone,
                date_of_birth: dob,
                authentication: {
                    user_password: authentication(password, salte),
                    salt: salte,
                    sessionToken: null,
                    verificationCode: Code,
                    isVerified: true, 
                },
                role: "CUSTOMER",
                group_id:'6768b9ca67d4dd30bb05e411',
            });
            const subject = 'Xác thực tài khoản của bạn';
        const content = 'Xin chào, ' +name+'\n\n'+'Cảm ơn bạn đã đăng ký tài khoản tại 5H Tourist với mật khẩu là: '+password+'. Mã xác thực đặt lịch của bạn là: '+bookingCode+'\n\n'+'Vui lòng nhập mã này để hoàn tất quá trình tạo tài khoản và đặt Schedule.';
        sendEmail(mail, subject, content).catch(err => {
                    console.error('Lỗi khi gửi email:', err); // Log lỗi nếu gửi email thất bại
                });
                return res.status(200).json({ message: 'Đặt lịch trình thành công, vui lòng kiểm tra email để nhận tài khoản và mã xác thực đặt lịch', userId:user._id });
        }


        // const sessionToken = req.headers.authorization;
        // const loggedInUser = await getUserBySessionToken(sessionToken);
        // if (!loggedInUser) {
        //     return res.status(401).json({ message: "Yêu cầu đăng nhập" }).end();
        // }





        const scheduledt = await getScheduleById(schedule).populate('tour_id').lean();

        if(!scheduledt){
            return res.status(400).json({message:'Schedule không tồn tại'}).end();
        }

        const tour= await TourModel.findById(scheduledt.tour_id);

        const tourname=tour.tour_name;
        const tourcode=tour.tour_code;

        if(number_slot>scheduledt.available_slots){
            return res.status(400).json({message:'Số lượng vé nhiều hơn số chỗ còn lại'}).end();
        }

        scheduledt.available_slots=scheduledt.available_slots-number_slot;
        const updatedSchedule=await updateOneField(scheduledt, 'available_slots', scheduledt.available_slots);

        const tprice= await TourPriceModel.findOne({tour_id: scheduledt.tour_id});

        if(!tprice){
            return res.status(400).json({message:'Giá Tour không tồn tại'}).end();
        }


        const bookingData= {
            customer_id: user._id,
            schedule_id: schedule,
            booking_date: date,
            total_price: price,
            status: stt,
            number_slots: number_slot,
            adult_price: tprice.adult_price,
            children_price: tprice.children_price,
            infant_price: tprice.infant_price,
            tour_name: tourname,
            schedule_code:scheduledt.schedule_code,
            schedule_date:scheduledt.departure_date,
        };

        const booking = await createBooking(bookingData);




        const passengerList = [];
        for (let i = 0; i < number_slot; i++) {
            const passengerData = passengers[i]; // Giả định client gửi danh sách passengers
            if (!passengerData) {
                return res.status(400).json({ message: "Thiếu thông tin hành khách" }).end();
            }
            const passenger = await createPassenger({
                booking_id: booking._id,
                passenger_name: passengerData.name,
                passenger_date: passengerData.date,
                passenger_type: passengerData.type,
                passport_number: passengerData.passport || null,
            });
            passengerList.push(passenger);
        }

        
        booking.passengers = passengerList.map((p) => p._id);
        await booking.save();

        return res.status(200).json({ booking, passengers: passengerList, bookingCode }).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const updateBooking = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {status}=req.body;

        if(status==null||status==undefined){
            return res.status(400).json({message:'Thiếu thông tin Booking'}).end();
        }

        const booking= await updateBookingById(id, {status});

        if(!booking){
            return res.status(400).json({message:'Booking không tồn tại'}).end();
        }
        await booking.save();

        return res.status(200).json(booking).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const deleteBooking = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;
        const booking=await deleteBookingById(id);
        if(!booking){
            return res.status(400).json({message:'Booking không tồn tại'}).end();
        }
        return res.status(200).json(booking).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}


export const getBookingByIdWithTheDetails = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const booking = await getBookingById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking không tồn tại' }).end();
        }

        const customer= await getUserById(booking.customer_id.toString());

        const schdule= await getScheduleById(booking.schedule_id.toString());

        const passengers= await PassengerModel.find({booking_id: booking._id});

        const result={
            ...booking.toObject(),
            customer,
            schdule,
            passengers,
        }

        return res.status(200).json(result).end();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Lỗi' }).end();
    }
}
export const getSchedulesByCustomerId = async (req: express.Request, res: express.Response) => {
    try {
      const customer_id = req.params.customer_id; 
  
      const bookings = await BookingModel.find({ customer_id })
        .populate('schedule_id'); 
  
      if (bookings.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy Schedule cho khách hàng này' });
      }
  
      const schedules = bookings.map(booking => booking.schedule_id);
  
      return res.status(200).json(schedules);
    } catch (error) {
      console.error('Error in getScheduleByCustomerId:', error);
      return res.status(500).json({ message: 'Lỗi khi lấy Schedule cho khách hàng', error });
    }
  };
  export const getBookingByCustomerId = async (req: express.Request, res: express.Response) => {
    try {
      const customer_id = req.params.customer_id; 
  
      const bookings = await BookingModel.find({ customer_id })
      .populate({
        path: 'schedule_id',
        populate: {
            path: 'tour_id', 
        },
    });
  
      if (bookings.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy Booking cho khách hàng này' });
      }

      const bookingWithPassengers = await Promise.all(
        bookings.map(async (booking) => {
          const passengers = await PassengerModel.find({ booking_id: booking._id });
          return { ...booking.toObject(), passengers };
        })
      );
  
      return res.status(200).json(bookingWithPassengers);
    } catch (error) {
      console.error('Error in getScheduleByCustomerId:', error);
      return res.status(500).json({ message: 'Lỗi khi lấy Booking cho khách hàng', error });
    }
  };
