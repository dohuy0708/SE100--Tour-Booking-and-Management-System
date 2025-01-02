import { get } from 'lodash';
import mongooser from "mongoose";


const TourTypes={
    TRONG_NUOC:'TRONG NƯỚC',
    QUOC_TE:'QUỐC TẾ',
};


const TourSchema = new mongooser.Schema({
    tour_name:{type: String, required: true},
    tour_code:{type: String, required: true},
    tour_type:{
        type: [String],
        enum:[TourTypes.QUOC_TE, TourTypes.TRONG_NUOC],
        required: true,
    },
    duration:{type: String, required: true},
    description:{type: String, required: true},
    policy_id:{type: mongooser.Schema.Types.ObjectId, ref: 'TourPolicy', required: true},
    cover_image:{type: String, required: true},
});



export const TourModel = mongooser.model('Tour', TourSchema);

export const createTour=(values: Record<string, any>, session?:mongooser.ClientSession)=>
{
    const tour=new TourModel(values);
    return tour.save({session}).then((tour)=>tour.toObject());
}

export const updateTourById=(tour_id:string, values: Record<string, any>)=> TourModel.findByIdAndUpdate(tour_id, values);

export const deleteTourById=(tour_id:string)=>TourModel.findByIdAndDelete({_id: tour_id});

export const getTours=()=>TourModel.find();

export const getTourById=(tour_id:string)=>TourModel.findById(tour_id);

export const getTourByCode=(tour_code:string)=>TourModel.findOne({tour_code});
