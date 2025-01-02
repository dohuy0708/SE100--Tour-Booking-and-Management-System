import { TourPolicyModel } from "../db/tour_policy";
import { filterTours, searchTours, TourModel } from '../db/tour';
import { TourPriceModel } from '../db/tour_price';
import { TourLocationModel } from '../db/tour_location';
import { createTour, deleteTourById, updateTourById, getTourByCode, getTours, getTourById} from "../db/tour";
import express from "express";
import { TourProgramModel, deleteProgramByTourId } from "../db/tour_program";
import { deletePriceByTourId } from "../db/tour_price";
import { getScheduleByTourId, ScheduleModel } from "../db/schedule";
import mongooser from "mongoose";
import { createPrice } from "../db/tour_price";
import { createProgram } from "../db/tour_program";
import { createTourLocation } from "../db/tour_location";




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

        if(name==null||code==null||type==null||dura==null||descri==null||policy==null||name==undefined||code==undefined||type==undefined||dura==undefined||descri==undefined||policy==undefined||!req.file){
            return res.status(400).json({message:'Thiếu thông tin Tour'}).end();
        }

        const tour= await createTour({
            tour_name: name,
            tour_code: code,
            tour_type: type,
            duration: dura,
            description: descri,
            policy_id: policy,
            cover_image: '/assets/'+req.file.filename,
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

        if(name==null||code==null||type==null||dura==null||descri==null||policy==null||name==undefined||code==undefined||type==undefined||dura==undefined||descri==undefined||policy==undefined||!req.file){
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

        const schedules= await getScheduleByTourId(id);

        if(schedules.length>0){
            return res.status(400).json({message:'Không thể xóa Tour vì đang có Schedule'}).end();
        }


        await deleteProgramByTourId(id);
        await deletePriceByTourId(id);

        const deleteTour= await deleteTourById(id);

        if(!deleteTour){
            return res.status(400).json({message:'Tour không tồn tại'}).end();
        }
        
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
                const price = await TourPriceModel.findOne({ tour_id: tour._id }).lean();

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


export const getTourWithProgram = async (req: express.Request, res: express.Response) => {
    try {
      const tours = await TourModel.find().populate('TourProgram'); 
      return res.status(200).json(tours).end();
    } 
    catch (error) {
        console.log(error);
        return res.sendStatus(400).json({message:'Lỗi'}).end();
    }
  }



  export const createTourWithAllDependencies = async (req: express.Request, res: express.Response) => {
    const session=await mongooser.startSession();
    session.startTransaction();
    try{
        const {
            name,
            code,
            type,
            dura,
            descri,
            policy,
            prices,
            programs,
            locations,
        } = req.body;
        if(
            name==null||
            code==null||
            type==null||
            dura==null||
            descri==null||
            policy==null||
            name==undefined||
            code==undefined||
            type==undefined||
            dura==undefined||
            descri==undefined||
            policy==undefined||
            !req.file
        ){
            return res.status(400).json({message:'Thiếu thông tin Tour'}).end();
        }

        //tao Tour
        const tour=await createTour({
            tour_name: name,
            tour_code: code,
            tour_type: type,
            duration : dura,
            description: descri,
            policy_id: policy,
            cover_image: '/assets/'+req.file.filename,
        }, session);

        //tao Price
        if(prices==null||prices==undefined||prices.adult_price==null||prices.children_price==null||prices.infant_price==null||prices.adult_price==undefined||prices.children_price==undefined||prices.infant_price==undefined){
            throw new Error('Thiếu thông tin Price');
        }

        await createPrice({
            tour_id: tour._id,
            adult_price: prices.adult_price,
            children_price: prices.children_price,
            infant_price: prices.infant_price,
        }, session);


        //tao Program

        if(!programs||!Array.isArray(programs)||programs.length===0){
            throw new Error('Thiếu Program');
        }

        for(const program of programs){
            if(program.day_number==null||program.program_description==null||program.day==undefined||program.descri==undefined){
                throw new Error('Thiếu thông tin Program');
            }

            await createProgram({
                tour_id: tour._id,
                day_number: program.day_number,
                program_description: program.program_description,
                image: '/assets/'+req.file.filename,
            }, session);
        }

        //tao Location
        if(!locations||!Array.isArray(locations)||locations.length===0){
            throw new Error('Thiếu Location');
        }

        for(const location of locations){
            if(location.location==null||location.location==undefined){
                throw new Error('Thiếu thông tin Location');
            }

            await createTourLocation(tour._id.toString(), location.location, session);
        }

        //commit transaction    
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json('Tạo tour và các dữ liệu liên quan thành công').end();
    }
    catch(error){
        await session.abortTransaction();
        session.endSession();
        console.error('Lối như sau: ', error);
        return res.status(400).json({message:'Lỗi khi tạo Tour'}).end();
    }
}



export const getTourWithAllDetailsById = async (req: express.Request, res: express.Response) => {
    try {
       const { id } = req.params;
        // Lấy thông tin tour
        const tourDetails = await getTourById(id);
        if (!tourDetails) {
            return res.status(404).json({ message: 'Không tìm thấy tour' }).end();
        }
        // Lấy thông tin giá tour
           // Lấy giá tour
           const price = await TourPriceModel.findOne({ tour_id: tourDetails._id }).lean();

           // Lấy chương trình tour
           const programs = await TourProgramModel.find({ tour_id: tourDetails._id }).lean();

           // Lấy lịch trình tour
           const schedules = await ScheduleModel.find({ tour_id: tourDetails._id }).lean();

              // Gộp thông tin
            const result = {
                ...tourDetails,
                tourPrice: price,
                tourPrograms: programs,
                tourSchedules: schedules,
            }

        // Trả về kết quả
        return res.status(200).json(result).end();
    } catch (error) {
        console.error('Error in getTourWithAllDetailsById:', error);
        return res.status(500).json({ message: 'Lỗi hệ thống', error: error.message }).end();
    }
};
export const tourSearchAndFilter = async (req: express.Request, res: express.Response) => {
    try {
        const { searchString, filters } = req.body; 

        let searchResults = [];
        if (searchString) {
            searchResults = await searchTours(searchString);
        } else {
            searchResults = await TourModel.find().exec(); 
        }
        if (searchResults.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy tour' }).end();
        }

        let filteredTours = searchResults;
        if (filters) {
            const filteredTourIds = await filterTours(filters);
filteredTours = searchResults.filter((tour: any) =>
    filteredTourIds.some((filteredId: any) => filteredId.toString() === tour._id.toString())
);

        }
        if (filteredTours.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy tour' }).end();
        }

        return res.status(200).json(filteredTours);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Lỗi', error });
    }
};
