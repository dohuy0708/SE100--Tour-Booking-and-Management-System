import mongooser from "mongoose";

const TourLocationSchema = new mongooser.Schema({
    tour_id:{type: mongooser.Schema.Types.ObjectId, ref: 'Tour', required: true},
    location_id:{type: mongooser.Schema.Types.ObjectId, ref: 'Location', required: true},

});

export const TourLocationModel = mongooser.model('TourLocation', TourLocationSchema);

export const createTourLocation=async(tourId:string, locationId:string)=>{
    try{
        const existingTourLocation = await TourLocationModel.findOne({tour_id: tourId, location_id: locationId});
        if(existingTourLocation){
            return {message: 'Đã tồn tại Location này trong Tour này', status:'existed'};
        }

        //neu chua co
        const newTourLocation = new TourLocationModel({tour_id: tourId, location_id: locationId});

        await newTourLocation.save();
        return {message: 'Tạo Location trong Tour này thành công', status:'success'};
    }
    catch(error){
        return {message: 'Tạo Location trong Tour này thất bại', status:'failed'};
    }
} 

export const getTourLocations= async()=>{
    try{
        const TourLocations = await TourLocationModel.find()
        .populate('tour_id','tour_name')
        .populate('location_id','location_name');
        return TourLocations;
    }
    catch(error){
        return {message: 'Lấy danh sách Location trong Tour thất bại', status:'failed'};
    }
}

export const deleteTourLocation = async (tourId:string, locationId:string)=>{
    try{
        const deletedRelation = await TourLocationModel.findOneAndDelete({
            tour_id: tourId,
            location_id: locationId,
        })

        if(!deletedRelation){
            return {message: 'Không có mối quan hệ này', status:'NOT_FOUND'};
        }
        return {message: 'Xóa quan hệ giữa Tour và Location thành công', status:'success'};
    }
    catch(error){
        return {message: 'Xóa quan hệ giữa Tour và Location thất bại', status:'failed'};
    }
}
