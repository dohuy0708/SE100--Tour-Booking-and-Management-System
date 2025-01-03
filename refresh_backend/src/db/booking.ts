import mongooser from "mongoose";


export const BookingStatus ={
    PENDING: 'CHỜ XÁC NHẬN',
    CONFIRMED: 'ĐÃ XÁC NHẬN',
    CANCELLED: 'ĐÃ HỦY',
}

const BookingSchema = new mongooser.Schema({
    customer_id:{type: mongooser.Schema.Types.ObjectId, ref: 'User', },
    schedule_id:{type: mongooser.Schema.Types.ObjectId, ref: 'Schedule', required: true},
    number_slots:{type: Number, required: true},
    booking_date:{type: Date, required: true}, 
    total_price:{type: mongooser.Types.Decimal128,
                    required: true,
                    get: (value: mongooser.Types.Decimal128) => value ? value.toString() : null, 
                    set: (value: string | number) => mongooser.Types.Decimal128.fromString(value.toString())},
    status : {type: String,
             required: true,
             enum: [BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.CANCELLED],},
    schedule_details: {type: Object, required: true},
    tour_details: {type: Object, required: true},
    adult_price:{type: mongooser.Types.Decimal128,
                    required: true,
                    get: (value: mongooser.Types.Decimal128) => value ? value.toString() : null, 
                    set: (value: string | number) => mongooser.Types.Decimal128.fromString(value.toString())},
        children_price:{type: mongooser.Types.Decimal128,
                    required: true,
                    get: (value: mongooser.Types.Decimal128) => value ? value.toString() : null, 
                    set: (value: string | number) => mongooser.Types.Decimal128.fromString(value.toString())}, 
        infant_price:{type: mongooser.Types.Decimal128,
                        required: true,
                        get: (value: mongooser.Types.Decimal128) => value ? value.toString() : null, 
                        set: (value: string | number) => mongooser.Types.Decimal128.fromString(value.toString())},
    passengers: [{ type: mongooser.Schema.Types.ObjectId, ref: "Passenger" }],
    tour_name: {type: String, required: true},
    schedule_code: {type: String, required: true},
    schedule_date: {type: Date, required: true},
});




export const BookingModel = mongooser.model('Booking', BookingSchema);

export const createBooking=(values: Record<string, any>)=>{
    const booking=new BookingModel(values);
    return booking.save();
}
export const updateBookingById=(booking_id:string, values: Record<string, any>)=> BookingModel.findByIdAndUpdate(booking_id, values);

export const deleteBookingById=(booking_id:string)=>BookingModel.findByIdAndDelete({_id: booking_id});

export const getBookings=()=>BookingModel.find();

export const getBookingById=(booking_id:string)=>BookingModel.findById(booking_id);

export const getBookingWithDetails=()=>{
    BookingModel.find().populate('customer_id').populate('tour_id');
}

export const getBookingByIdWithDetails=(booking_id:string)=>{
    BookingModel.findById(booking_id).populate('customer_id').populate('tour_id');
}