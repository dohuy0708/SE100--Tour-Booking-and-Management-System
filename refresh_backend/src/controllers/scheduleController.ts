import { createSchedule, updateScheduleById, deleteScheduleById, getSchedules, getScheduleByTourId, getScheduleById, ScheduleModel} from "../db/schedule";
import express from "express";

export const getAllSchedules = async (req: express.Request, res: express.Response) => {

    try{
            const schedules=await getSchedules();
            return res.status(200).json(schedules).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewSchedule = async (req: express.Request, res: express.Response) =>{

    try{
        const {tour, code, sta, date, time, capa, avail}=req.body;

        if(tour==null||code==null||sta==null||date==null||time==null||capa==null||avail==null||tour==undefined||code==undefined||sta==undefined||date==undefined||time==undefined||capa==undefined||avail==undefined){
            return res.status(400).json({message:'Thiếu thông tin Schedule'}).end();
        }

        const schedule= await createSchedule({
            tour_id:tour,
            schedule_code:code,
            status:sta,
            departure_date:date,
            departure_time:time,
            capacity:capa,
            available_slots:avail,
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
        const {id}=req.params;  
        const {sta, capa}=req.body;

        if(sta==null||capa==null||sta==undefined||capa==undefined){
            return res.status(400).json({message:'Thiếu thông tin Schedule'}).end();
        }

        const schedule= await updateScheduleById(id, {
            status:sta,
            capacity:capa,
        });

        if(!schedule){
            return res.status(400).json({message:'Schedule không tồn tại'}).end();
        }
        await schedule.save();

        return res.status(200).json(schedule).end();
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

        const schedules = await getScheduleByTourId(tour);

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
        const schedules = await ScheduleModel.find({status: "END"})

        if (!schedules.length) {
            return res.status(404).json({ message: 'Không tìm thấy schedule' }).end();
        }
        return res.status(200).json(schedules).end();
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Lỗi hệ thống' }).end();
    }
}