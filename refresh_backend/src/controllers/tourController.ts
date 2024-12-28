import { TourPolicyModel } from "../db/tour_policy";
import { createTour, deleteTourById, updateTourById, getTourByCode, getTours, TourModel} from "../db/tour";
import express from "express";
import { TourProgramModel } from "../db/tour_program";
import { ScheduleModel } from "../db/schedule";

export const getAllTours = async (req: express.Request, res: express.Response) => {

    try{
            const tours=await getTours();
            return res.status(200).json(tours).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewTour = async (req: express.Request, res: express.Response) =>{

    try{
        const {name, code, type, dura, descri, policy}=req.body;

        if(name==null||code==null||type==null||dura==null||descri==null||policy==null||name==undefined||code==undefined||type==undefined||dura==undefined||descri==undefined||policy==undefined){
            return res.status(400).json({message:'Thiếu thông tin Tour'}).end();
        }

        const tour= await createTour({
            tour_name: name,
            tour_code: code,
            tour_type: type,
            duration: dura,
            description: descri,
            policy_id: policy,
        });

        return res.status(200).json(tour).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const updateTour = async (req: express.Request, res: express.Response) =>{

    try{
        const {id}=req.params;  
        const {name, code, type, dura, descri, policy}=req.body;

        if(name==null||code==null||type==null||dura==null||descri==null||policy==null||name==undefined||code==undefined||type==undefined||dura==undefined||descri==undefined||policy==undefined){
            return res.status(400).json({message:'Thiếu thông tin Tour'}).end();
        }

        const tour= await updateTourById(id, {name, code, type, dura, descri, policy});

        if(!tour){
            return res.status(400).json({message:'Tour không tồn tại'}).end();
        }
        await tour.save();

        return res.status(200).json(tour).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const deleteTour = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;
        const deleteTour= await deleteTourById(id);
        return res.status(200).json(deleteTour).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const getTourByTourCode = async (req: express.Request, res: express.Response) =>{
    try{
        const {code}=req.body;
        const tour= await getTourByCode(code);
        return res.status(200).json(tour).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}
export const getAllTourWithDetail = async (req: express.Request, res: express.Response) => {
    try {
        const tours = await TourModel.find().lean();

        // Dùng Promise.all để xử lý bất đồng bộ cho tất cả tours
        const result = await Promise.all(
            tours.map(async (tour) => {
                // Lấy giá tour
                const price = await TourPolicyModel.findOne({ tour_id: tour._id }).lean();

                // Lấy chương trình tour
                const programs = await TourProgramModel.find({ tour_id: tour._id }).lean();

                // Lấy lịch trình tour
                const schedules = await ScheduleModel.find({ tour_id: tour._id }).lean();

                // Gộp thông tin
                return {
                    ...tour,
                    tourPrice: price,
                    tourPrograms: programs,
                    tourSchedules: schedules,
                };
            })
        );

        // Trả về toàn bộ kết quả
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getAllTourWithDetail:", error);
        res.status(500).json({ message: "Error fetching tour details" });
    }
};
