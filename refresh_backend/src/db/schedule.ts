import { get } from 'lodash';
import mongooser from "mongoose";
import { TourPriceModel } from './tour_price';
import { LocationModel } from './location';

const ScheduleSchema = new mongooser.Schema({
    tour_id:{type: mongooser.Schema.Types.ObjectId, ref: 'Tour', required: true},
    schedule_code:{type: String, required: true},
    status:{type: [String],
        enum:['SELLING','WAITING_FOR_PROGRESS','IN_PROGRESS','END'],
        required: true,
    },
    departure_date:{type: Date, required: true},
    departure_time:{type: String,
         required: true,
         validate: {
            validator: (value: string) => /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/.test(value), // Regex for HH:mm:ss
            message: "Thời gian phải theo định dạng HH:mm:ss hoặc HH:mm",
          },
        },
    capacity:{type: Number, required: true},
    available_slots:{type: Number, required: true},
    tour_name:{type: String, required: true},
    tour_code:{type: String, required: true},
});


export const ScheduleStatus={
    SELLING:'SELLING',
    WAITING_FOR_PROGRESS:'WAITING_FOR_PROGRESS',
    IN_PROGRESS:'IN_PROGRESS',
    END:'END',
};


export const ScheduleModel = mongooser.model('Schedule', ScheduleSchema);

export const createSchedule=(values: Record<string, any>)=> new ScheduleModel(values)
.save().then((schedule)=>schedule.toObject());

export const updateScheduleById=(schedule_id:string, values: Record<string, any>)=> ScheduleModel.findByIdAndUpdate(schedule_id, values);

export const deleteScheduleById=(schedule_id:string)=>ScheduleModel.findByIdAndDelete({_id: schedule_id});

export const getSchedules=()=>ScheduleModel.find();

export const getScheduleById=(schedule_id:string)=>ScheduleModel.findById(schedule_id);

export const getScheduleByCode=(schedule_code:string)=>ScheduleModel.findOne({schedule_code});

export const getScheduleByTourId = (tour_id: string, filter: any = {}) => {
    return ScheduleModel.find({ tour_id, ...filter }).lean();
};
export const searchSchedules = async (searchString: string) => {
   
    if (!searchString) {
        return await ScheduleModel.find().populate('tour_id').exec();
    }

    const scheduleResults = await ScheduleModel.find({
        schedule_code: new RegExp(searchString, 'i'),
    }).populate('tour_id').exec();

    if (scheduleResults.length > 0) {
        return scheduleResults;
    }

    const schedulesByTour = await ScheduleModel.find()
        .populate({
            path: 'tour_id',
            match: {
                $or: [
                    { tour_code: new RegExp(searchString, 'i') },
                    { tour_name: new RegExp(searchString, 'i') },
                ],
            },
        })
        .exec();

    const filteredSchedules = schedulesByTour.filter(
        (schedule: any) => schedule.tour_id !== null
    );

    return filteredSchedules;
};


export const filterSchedules = async (filters: any) => {
    const { departure_date, status, location_name, min_price, max_price } = filters;

    let query: any = {};

    // Lọc theo ngày bắt đầu
    if (departure_date) {
        query['departure_date'] = { $gte: new Date(departure_date) };
    }

    // Lọc theo tình trạng
    if (status) {
        query['status'] = { $in: status };
    }

    // Lọc theo địa điểm (location_name)
    if (location_name) {
        // Tìm kiếm các tour_id liên quan đến location_name
        const locations = await LocationModel.find({ location_name: { $regex: location_name, $options: 'i' } }).exec();
        const locationIds = locations.map((location) => location._id);
        query['tour_id'] = { $in: locationIds };
    }

    // Lọc theo giá
    if (min_price || max_price) {
        const priceFilter: any = {};
        if (min_price) priceFilter.$gte = min_price;
        if (max_price) priceFilter.$lte = max_price;

        const tourPrices = await TourPriceModel.find({
            $or: [
                { adult_price: priceFilter },
                { children_price: priceFilter },
                { infant_price: priceFilter },
            ],
        }).exec();

        const priceTourIds = tourPrices.map((price) => price.tour_id.toString());
        query['tour_id'] = { $in: priceTourIds };
    }

    // Lấy các schedule đã được lọc
    const schedules = await ScheduleModel.find(query).populate('tour_id').exec();

    return schedules;
};
