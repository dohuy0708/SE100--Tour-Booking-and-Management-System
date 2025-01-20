import mongooser from "mongoose";

const BookingSchema = new mongooser.Schema({
    customer_id:{type: mongooser.Schema.Types.ObjectId, ref: 'User', required: true},
    tour_id:{type: mongooser.Schema.Types.ObjectId, ref: 'Tour', required: true},
    number_slots:{type: Number, required: true},
    booking_date:{type: Date, required: true}, 
    total_price:{type: mongooser.Types.Decimal128,
                    required: true,
                    get: (value: mongooser.Types.Decimal128) => value ? value.toString() : null, 
                    set: (value: string | number) => mongooser.Types.Decimal128.fromString(value.toString())},
    status : {type: [String],
             required: true},
             enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
});

export const BookingStatus ={
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    CANCELLED: 'CANCELLED',
}


export const BookingModel = mongooser.model('Booking', BookingSchema);

export const createBooking=(values: Record<string, any>)=> new BookingModel(values)
.save().then((booking)=>booking.toObject());

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