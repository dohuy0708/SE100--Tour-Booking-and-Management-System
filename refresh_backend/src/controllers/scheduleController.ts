import { getTourById, TourModel } from "../db/tour";
import { createSchedule, updateScheduleById, deleteScheduleById, getSchedules, getScheduleByTourId, getScheduleById, ScheduleModel, filterSchedules, searchSchedules, ScheduleStatus} from "../db/schedule";
import express from "express";
import { TourMedia } from "../../../backend/src/models/tourmedia_model";

export const getAllSchedules = async (req: express.Request, res: express.Response) => {

    try{
            const schedules=await getSchedules().populate({
                path: 'tour_id',
                select: 'cover_image'
            }).lean();
            
            return res.status(200).json(schedules).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewSchedule = async (req: express.Request, res: express.Response) =>{

    try{
        const {tour, code, sta, date, time, capa}=req.body;

        if(tour==null||code==null||sta==null||date==null||time==null||capa==null||tour==undefined||code==undefined||sta==undefined||date==undefined||time==undefined||capa==undefined){
            return res.status(400).json({message:'Thiếu thông tin Schedule'}).end();
        }

        const tourr=await getTourById(tour);
        if(!tourr){
            return res.status(400).json({message:'Tour không tồn tại'}).end();
        }

        const schedule= await createSchedule({
            tour_id:tour,
            schedule_code:code,
            status:sta,
            departure_date:date,
            departure_time:time,
            capacity:capa,
            available_slots:capa,
            tour_name:tourr.tour_name,
            tour_code:tourr.tour_code,
        });

        return res.status(200).json(schedule).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const updateSchedule = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.body;  
        const {sta}=req.body;

        if(sta==null||sta==undefined || id==null||id==undefined){
            return res.status(400).json({message:'Thiếu thông tin Schedule'}).end();
        }

        const schedule= await updateScheduleById(id, {
            status:sta,
        });

        if(!schedule){
            return res.status(400).json({message:'Schedule không tồn tại'}).end();
        }
        await schedule.save();

        return res.status(200).json("Success").end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const deleteSchedule = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;
        const schedule= await getScheduleById(id);
        if(!schedule){
            return res.status(400).json({message:'Schedule không tồn tại'}).end();
        }

        if(!schedule.status.includes('SELLING')){
            return res.status(400).json({message:'Chỉ có thể xóa Schedule đang bán'}).end();
        }

        const deletedSchedule=await deleteScheduleById(id);

        return res.status(200).json(deletedSchedule).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const getScheduleByTheTourId = async (req: express.Request, res: express.Response) =>{
    try {
        const { id: tour } = req.params; 

        if (tour == null || tour == undefined) {
            return res.status(400).json({ message: 'Thiếu tour_id' }).end();
        }

        const currentDate=new Date();
        const schedules = await getScheduleByTourId(tour, {
            departure_date: { $gt: currentDate}
        });


        if (!schedules.length) {
            return res.status(404).json({ message: 'Không tìm thấy schedule nào cho tour này' }).end();
        }

        return res.status(200).json(schedules).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Lỗi hệ thống' }).end();
    }
}
export const getEndSchedule = async (req: express.Request, res: express.Response) =>{
    try{
        const schedules = await ScheduleModel.find({status: ScheduleStatus.END}).exec();

        if (!schedules.length) {
            return res.status(404).json({ message: 'Không tìm thấy schedule' }).end();
        }
        return res.status(200).json(schedules).end();
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Lỗi hệ thống' }).end();
    }
}
export const scheduleSearchAndFilter = async (req: express.Request, res: express.Response) => {
    try {
        const { searchString, filters } = req.body;

        // Tìm kiếm schedule theo mã schedule, mã tour, hoặc tên tour
        let searchResults = [];
        if (searchString) {
            searchResults = await searchSchedules(searchString);
        } else {
            // Nếu không có searchString, lấy tất cả schedules
            searchResults = await ScheduleModel.find().populate('tour_id').exec();
        }

        // Nếu không có filters, trả về toàn bộ kết quả tìm kiếm
        if (!filters || Object.keys(filters).length === 0) {
            return res.status(200).json(searchResults);
        }

        // Áp dụng filter
        const filteredSchedules = await filterSchedules(filters);

        // Kết hợp kết quả search và filter
        const finalSchedules = searchResults.filter((schedule: any) =>
            filteredSchedules.some((filtered: any) => filtered._id.toString() === schedule._id.toString())
        );
        return res.status(200).json(finalSchedules);
    } catch (error) {
        console.error('Error in scheduleSearchAndFilter:', error);
        return res.status(500).json({ message: 'Lỗi server', error });
    }
};