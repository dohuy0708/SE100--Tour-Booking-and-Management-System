import { getUserByEmail, createUser, getUserBySessionToken } from "../db/user";
import { createBooking, deleteBookingById, updateBookingById, getBookings, getBookingByIdWithDetails, BookingModel   } from "../db/booking";
import { getScheduleById } from "../db/schedule";
import { getPriceByTourId, TourPriceModel } from "../db/tour_price";
import express from "express";
import { random, randomCode, authentication } from "../helpers";
import { sendEmail } from '../helpers/mail_helper';
import { createPassenger } from "../db/passenger";


export const getAllBookings = async (req: express.Request, res: express.Response) => {

    try{
            const bookings=await getBookings();
            return res.status(200).json(bookings).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewBooking = async (req: express.Request, res: express.Response) =>{
    try{
        const {name, phone, mail, addr, schedule, date, price, stt, number_slot, method, passengers} = req.body;

        if(name==null||phone==null||mail==null||addr==null||schedule==null||date==null||price==null||stt==null||number_slot==null||name==undefined||phone==undefined
            ||mail==undefined||addr==undefined||schedule==undefined||date==undefined||price==undefined||stt==undefined||number_slot==undefined||method==null||method==undefined||passengers==null||passengers==undefined){
            return res.status(400).json({message:'Thiếu thông tin Booking'}).end();
        }

        let user=await getUserByEmail(mail);
        if(!user){
            const salte=random();
            const password=mail+'@123';
            const Code=randomCode();
            const newuser= await createUser({
                user_name: name,
                email: mail,
                phone_number: phone,
                address: addr,
                authentication: {
                    user_password: authentication(password, salte),
                    salt: salte,
                    sessionToken: null,
                    verificationCode: Code,
                    isVerified: false, 
                },
                role: "CUSTOMER",
                group_id:'6768b9ca67d4dd30bb05e411',
            });
            const subject = 'Xác thực tài khoản của bạn';
        const content = 'Xin chào, ' +name+'\n\n'+'Cảm ơn bạn đã đăng ký tài khoản tại 5H Tourist với mật khẩu là: '+password+'. Mã xác thực của bạn là: '+Code+'\n\n'+'Vui lòng nhập mã này để hoàn tất quá trình tạo tài khoản và đặt Schedule.';
        sendEmail(mail, subject, content).catch(err => {
                    console.error('Lỗi khi gửi email:', err); // Log lỗi nếu gửi email thất bại
                });
                return res.status(200).json({ message: 'Tạo tài khoản thành công, vui lòng kiểm tra email để xác minh tài khoản', userId:user._id });
        }


        const sessionToken = req.headers.authorization;
        const loggedInUser = await getUserBySessionToken(sessionToken);
        if (!loggedInUser) {
            return res.status(401).json({ message: "Yêu cầu đăng nhập" }).end();
        }





        const scheduledt = await getScheduleById(schedule).populate('tour_id').lean();

        if(!scheduledt){
            return res.status(400).json({message:'Schedule không tồn tại'}).end();
        }


        const tprice= await TourPriceModel.findOne({tour_id: scheduledt.tour_id});

        if(!tprice){
            return res.status(400).json({message:'Giá Tour không tồn tại'}).end();
        }


        const bookingData= {
            
            schedule_id: schedule,
            booking_date: date,
            total_price: price,
            status: stt,
            number_slots: number_slot,
            schedule_details: scheduledt,
            tour_details: scheduledt.tour_id,
            adult_price: tprice.adult_price,
            children_price: tprice.children_price,
            infant_price: tprice.infant_price,
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

        return res.status(200).json({ booking, passengers: passengerList }).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const updateBooking = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {customer_id, schedule_id,date, price, status}=req.body;

        if(!customer_id||!schedule_id||!date||!price||!status){
            return res.status(400).json({message:'Thiếu thông tin Booking'}).end();
        }

        const booking= await updateBookingById(id, {customer_id, schedule_id,date, price, status});

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
        const booking = await getBookingByIdWithDetails(id) ;
        if (booking==undefined||booking==null) {
            return res.status(404).json({ message: 'Booking không tồn tại' }).end();
        }
        return res.status(200).json(booking).end();
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
  
      return res.status(200).json(bookings);
    } catch (error) {
      console.error('Error in getScheduleByCustomerId:', error);
      return res.status(500).json({ message: 'Lỗi khi lấy Booking cho khách hàng', error });
    }
  };
