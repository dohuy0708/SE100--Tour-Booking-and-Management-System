import mongooser from "mongoose";

const LocationSchema = new mongooser.Schema({
    location_name:{type:String, required: true},
    location_code:{type:String, required: true},
});

export const LocationModel = mongooser.model('Location', LocationSchema);

export const createLocation=(values: Record<string, any>)=> new LocationModel(values)
.save().then((location)=>location.toObject());

export const updateLocationById=(location_id:string, values: Record<string, any>)=> LocationModel.findByIdAndUpdate(location_id, values);

export const deleteLocationById=(location_id:string)=>LocationModel.findByIdAndDelete({_id: location_id});

export const getLocations=()=>LocationModel.find();

export const getLocationById=(location_id:string)=>LocationModel.findById({_id: location_id});