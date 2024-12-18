import { createSchedule, updateScheduleById, deleteScheduleById, getSchedules, getScheduleByCode } from "db/schedule";
import express from "express";

export const getAllSchedules = async (req: express.Request, res: express.Response) => {

    try{
            const schedules=await getSchedules();
            return res.status(200).json(schedules).end();
        }
        catch(error){
            console.log(error);
            return res.sendStatus(400).json({message:'Lỗi'}).end();
        }
}

export const createNewSchedule = async (req: express.Request, res: express.Response) =>{

    try{
        const {tour_id, schedule_code, status, date, time, capacity, avail}=req.body;

        if(!tour_id||!schedule_code||!status||!date||!time||!capacity||!avail){
            return res.sendStatus(400).json({message:'Thiếu thông tin Schedule'}).end();
        }

        const schedule= await createSchedule({
            tour_id,
            schedule_code,
            status,
            departure_date:date,
            departure_time:time,
            capacity,
            avail,
        });

        return res.status(200).json(schedule).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}

export const updateSchedule = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;  
        const {tour_id, schedule_code, status, date, time, capacity, avail}=req.body;

        if(!tour_id||!schedule_code||!status||!date||!time||!capacity||!avail){
            return res.sendStatus(400).json({message:'Thiếu thông tin Schedule'}).end();
        }

        const schedule= await updateScheduleById(id, {
            tour_id,
            schedule_code,
            status,
            departure_date:date,
            departure_time:time,
            capacity,
            avail,
        });

        if(!schedule){
            return res.sendStatus(400).json({message:'Schedule không tồn tại'}).end();
        }
        await schedule.save();

        return res.status(200).json(schedule).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}

export const deleteSchedule = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;
        const schedule= await deleteScheduleById(id);
        if(!schedule){
            return res.sendStatus(400).json({message:'Schedule không tồn tại'}).end();
        }
        return res.status(200).json(schedule).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
}