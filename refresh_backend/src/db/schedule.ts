import { get } from 'lodash';
import mongooser from "mongoose";

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

export const getScheduleByTourId=(tour_id:string)=>ScheduleModel.find({tour_id});