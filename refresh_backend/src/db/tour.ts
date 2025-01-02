import { get } from 'lodash';
import mongooser from "mongoose";
import { TourPriceModel } from './tour_price';
import { ScheduleModel } from './schedule';
import { TourLocationModel } from './tour_location';
import { LocationModel } from './location';


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
    policy_id:{type: mongooser.Schema.Types.ObjectId, ref: 'TourPolicy', default: null},
    cover_image:{type: String, default: null},
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

export const getTourById=async (id:string)=>
    {
        return await TourModel.findById(id).lean();
    };

export const getTourByCode=(tour_code:string)=>TourModel.findOne({tour_code});
export const searchTours = async (searchString: string) => {
    let query: any = {};

    if (searchString) {
        query['$or'] = [
            { 'tour_code': new RegExp(searchString, 'i') }, 
            { 'tour_name': new RegExp(searchString, 'i') }  
        ];
    }

    // Truy vấn các tour từ TourModel
    const tours = await TourModel.find(query).exec();
    return tours;
};

export const filterTours = async (filters: any) => {
    let { departure_date, status, location_name, min_price, max_price } = filters;

    let scheduleQuery: any = {};
    let tourIdsFromLocation: any[] = [];

    // Nếu không có điều kiện lọc nào, trả về tất cả các tour
    if (!departure_date && !status && !location_name && !min_price && !max_price) {
        // Trả về tất cả các tour nếu không có bất kỳ điều kiện lọc nào
        const allTours = await TourModel.find().exec();
        return allTours.map(tour => tour._id); // Trả về tất cả _id của các tour
    }

    // Lọc theo địa điểm (location_name)
    if (location_name) {
        // Lọc các location_id từ LocationModel theo tên địa điểm
        const locations = await LocationModel.find({ location_name: { $regex: location_name, $options: 'i' } }).exec();
        const locationIds = locations.map((location) => location._id);

        // Lọc tour_id từ TourLocation có liên quan đến các location_id này
        const tourLocations = await TourLocationModel.find({ location_id: { $in: locationIds } }).exec();
        tourIdsFromLocation = tourLocations.map((tourLocation) => tourLocation.tour_id);
    }
    else{
        const tour = await TourModel.find();
        tourIdsFromLocation=tour.map((tour) => tour._id)
    }

    // Lọc theo ngày bắt đầu (departure_date)
    if (departure_date) {
        scheduleQuery['departure_date'] = { $gte: new Date(departure_date) };
    }

    // Lọc theo tình trạng (status)
    if (status) {
        scheduleQuery['status'] = { $in: status };
    }

    // Lọc các schedule theo điều kiện
    const schedules = await ScheduleModel.find(scheduleQuery).exec();

    // Lấy tour_id từ các schedule đã lọc
    const tourIdsFromSchedule = schedules.map((schedule: any) => schedule.tour_id);

    // Lọc theo giá trong TourPrice
    let priceQuery: any = {};
    if (min_price || max_price) {
        const priceFilter: any = {};
        if (min_price) priceFilter.$gte = min_price;
        if (max_price) priceFilter.$lte = max_price;
        priceQuery = { $or: [
            { 'adult_price': priceFilter },
            { 'children_price': priceFilter },
            { 'infant_price': priceFilter }
        ] };
    }

    const tourPrices = await TourPriceModel.find(priceQuery).exec();
    const tourIdsFromPrice = tourPrices.map((price: any) => price.tour_id);

    // Tìm các tour_id chung giữa Location, Schedule và TourPrice
    const filteredTourIds = tourIdsFromLocation
    .filter((tour_id: any) => 
        tourIdsFromSchedule.some((schedule_id: any) => schedule_id.toString() === tour_id.toString()) && 
        tourIdsFromPrice.some((price_id: any) => price_id.toString() === tour_id.toString())
    );
    return filteredTourIds;
};

