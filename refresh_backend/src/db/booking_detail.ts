import mongooser from "mongoose";

const BookingDetailSchema = new mongooser.Schema({
    booking_id:{type: mongooser.Schema.Types.ObjectId, ref: 'Booking', required: true},
    passenger_id:{type: mongooser.Schema.Types.ObjectId, ref: 'Passenger', required: true},
    slot_type:{
        type: String,
        enum:['ADULT','CHILDREN','INFANT'],
        required: true,
    }
    
});

export const SlotTypes={
    ADULT:'ADULT',
    CHILDREN:'CHILDREN',
    INFANT:'INFANT',
};


export const BookingDetailModel = mongooser.model('BookingDetail', BookingDetailSchema);

export const createBookingDetail=(values: Record<string, any>)=> new BookingDetailModel(values)
.save().then((BookingDetail)=>BookingDetail.toObject());

export const updateBookingDetailById=(detail_id:string, values: Record<string, any>)=> BookingDetailModel.findByIdAndUpdate(detail_id, values);

export const deleteBookingDetailById=(detail_id:string)=>BookingDetailModel.findByIdAndDelete({_id: detail_id});

export const getBookingDetails=()=>BookingDetailModel.find();

export const getBookingDetailById=(detail_id:string)=>BookingDetailModel.findById(detail_id);