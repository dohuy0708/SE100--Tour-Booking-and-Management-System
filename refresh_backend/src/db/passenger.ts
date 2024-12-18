import mongooser from "mongoose";

export const PassengerSchema = new mongooser.Schema({
    booking_id:{type: mongooser.Schema.Types.ObjectId, ref: 'Booking', required: true},
    passenger_name:{type: String, required: true},
    passenger_age:{type: Number, required: true},
    passenger_type:{
        type: String,
        enum:['ADULT','CHILD','INFANT'],
        required: true,
    },
    passport_number:{type: String},
});

export const PassengerTypes={
    ADULT:'ADULT',
    CHILD:'CHILD',
    INFANT:'INFANT',
};

export const PassengerModel = mongooser.model('Passenger', PassengerSchema);

export const createPassenger=(values: Record<string, any>)=> new PassengerModel(values)
.save().then((passenger)=>passenger.toObject());

export const updatePassengerById=(passenger_id:string, values: Record<string, any>)=> PassengerModel.findByIdAndUpdate(passenger_id, values);

export const deletePassengerById=(passenger_id:string)=>PassengerModel.findByIdAndDelete({_id: passenger_id});

export const getPassengers=()=>PassengerModel.find();

export const getPassengerById=(passenger_id:string)=>PassengerModel.findById(passenger_id);