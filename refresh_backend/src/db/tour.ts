import { get } from 'lodash';
import mongooser from "mongoose";

const TourSchema = new mongooser.Schema({
    tour_name:{type: String, required: true},
    tour_code:{type: String, required: true},
    tour_type:{
        type: [String],
        enum:['DOMESTIC','INTERNATIONAL'],
        required: true,
    },
    duration:{type: Number, required: true},
    description:{type: String, required: true},
    policy_id:{type: mongooser.Schema.Types.ObjectId, ref: 'TourPolicy', required: true},
});

export const TourTypes={
    DOMESTIC:'DOMESTIC',
    INTERNATIONAL:'INTERNATIONAL',
};

export const TourModel = mongooser.model('Tour', TourSchema);

export const createTour=(values: Record<string, any>)=> new TourModel(values)
.save().then((tour)=>tour.toObject());

export const updateTourById=(tour_id:string, values: Record<string, any>)=> TourModel.findByIdAndUpdate(tour_id, values);

export const deleteTourById=(tour_id:string)=>TourModel.findByIdAndDelete({_id: tour_id});

export const getTours=()=>TourModel.find();

export const getTourById=(tour_id:string)=>TourModel.findById(tour_id);

export const getTourByCode=(tour_code:string)=>TourModel.findOne({tour_code});