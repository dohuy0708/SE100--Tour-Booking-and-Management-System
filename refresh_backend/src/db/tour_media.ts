import mongooser from "mongoose";

const TourMediaSchema = new mongooser.Schema({
    tour_id:{type: mongooser.Schema.Types.ObjectId, ref: 'Tour', required: true},
    cover:{type: String, required: true},
    image1:{type: String},
    image2:{type: String},
    image3:{type: String},
    image4:{type: String},
    image5:{type: String},
    image6:{type: String},
});



export const TourMediaModel = mongooser.model('TourMedia', TourMediaSchema);

export const createMedia=(values: Record<string, any>)=> new TourMediaModel(values)
.save().then((media)=>media.toObject());

export const updateMediaById=(media_id:string, values: Record<string, any>)=> TourMediaModel.findByIdAndUpdate(media_id, values);

export const deleteMediaById=(media_id:string)=>TourMediaModel.findByIdAndDelete({_id: media_id});

export const getMedias=()=>TourMediaModel.find();

export const getMediaById=(media_id:string)=>TourMediaModel.findById(media_id);