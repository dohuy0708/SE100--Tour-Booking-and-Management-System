import { TourPolicyModel } from "../db/tour_policy";
import { filterTours, searchTours, TourModel } from '../db/tour';
import { deletePriceById, TourPriceModel, updatePriceById, updatePriceByTourId } from '../db/tour_price';
import { TourLocationModel } from '../db/tour_location';
import { createTour, deleteTourById, updateTourById, getTourByCode, getTours, getTourById} from "../db/tour";
import express from "express";
import { TourProgramModel, deleteProgramById, deleteProgramByTourId, updateProgramById } from "../db/tour_program";
import { deletePriceByTourId } from "../db/tour_price";
import { getScheduleByTourId, ScheduleModel, ScheduleStatus } from "../db/schedule";
import mongooser from "mongoose";
import { createPrice } from "../db/tour_price";
import { createProgram, updateProgramByTourId } from "../db/tour_program";
import { createTourLocation } from "../db/tour_location";
import { LocationModel } from "../db/location";
import { abort } from "process";
import { Decimal128 } from "mongodb";




export const getAllTours = async (req: express.Request, res: express.Response) => {

    try{
            const tours=await getTours().lean();
            const tourPrices= await TourPriceModel.find().select('tour_id adult_price').lean();
           
            const TourWithAdultPrice=tours.map(tour=>{
                const price=tourPrices.find(price=>price.tour_id.toString()===tour._id.toString());
                return {
                    ...tour,
                    adult_price: price?.adult_price,
                }
            });

            return res.status(200).json(TourWithAdultPrice).end();
       
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

    const session = await mongooser.startSession();
    session.startTransaction();
    try{
        const {id}=req.params;  
        const {descri, a_price, c_price, i_price, pro_descris}=req.body;

        const schedules= await getScheduleByTourId(id);

        if (schedules.length > 0) {
            // Kiểm tra nếu có bất kỳ schedule nào đang bán
            const hasSellingSchedule = schedules.some(schedule => schedule.status === ScheduleStatus.SELLING);
          
            if (hasSellingSchedule) {
                await session.abortTransaction();
                session.endSession();
              return res
                .status(400)
                .json({ message: 'Không thể cập nhật Tour vì có Schedule đang bán' })
                .end();
            }
          }


        if(descri==null||descri==undefined|| a_price==null||a_price==undefined||c_price==null||c_price==undefined||i_price==null||i_price==undefined){
            await session.abortTransaction();
            session.endSession();
            console.log('Request body:', descri, a_price, c_price, i_price, pro_descris);
            return res.status(400).json({message:'Thiếu thông tin Tour'}).end();
        }

        const tour= await updateTourById(id, 
            {description:descri}).session(session);

        if(!tour){
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({message:'Tour không tồn tại'}).end();
        }


        // Xu li file upload
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        //const coverImage=files['cover_image'] ? files['cover_image'][0] : null;
        const programImages = files['program_images'] || [];


         // Cập nhật Program liên quan đến Tour
        //  const programs = await TourProgramModel.find({ tour_id: id }).lean();
        //  for (const program of programs) {
        //      await updateProgramByTourId(id, program, session);
        //  }

        if(!pro_descris||!Array.isArray(pro_descris)||pro_descris.length===0){
            console.log('Program Descriptions:', pro_descris);
            throw new Error('Thiếu Program Descriptions');
        }

        const programs= await TourProgramModel.find({tour_id: id}).lean();


        if(!programs||!Array.isArray(programs)||programs.length===0){
            console.log('Programs:', programs);
            throw new Error('Không có Program ứng với Tour');
        }

        if(pro_descris.length<programs.length)
        {
            throw new Error('Số mô tả mới không đủ cho số Program hiện tại');
        }

        

        let i=0;
        for(const program of programs){
            if(program.program_description==null||program.program_description==undefined){
                throw new Error('Thiếu thông tin Program');
            }

            await updateProgramById(program._id.toString(), {
                program_description: pro_descris[i],
                image: '/assets/'+ (programImages[i] ? programImages[i].filename : program.image),

            }).session(session);
            i++;
        }

        


      // Cập nhật Price liên quan đến Tour
    //   const price = await TourProgramModel.findOne({ tour_id: id }).lean();

    const price = await TourPriceModel.findOne({ tour_id: id }).lean();
    if (!price) {
        console.log('Prices:', price);
        throw new Error('Không có Price ứng với Tour');
      }

        await updatePriceById(price._id.toString(), {
            adult_price: a_price,
            children_price: c_price,
            infant_price: i_price,
        }).session(session);

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({message: 'Cập nhật Tour thành công'}).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const deleteTour = async (req: express.Request, res: express.Response) =>{
    const session=await mongooser.startSession();
    session.startTransaction();
    try{
        const {id}=req.params;

        const schedules= await getScheduleByTourId(id).session(session);

        if(schedules.length>0){
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({message:'Không thể xóa Tour vì đang có Schedule'}).end();
        }


        const programs= await TourProgramModel.find({tour_id: id}).session(session);
        for (const program of programs) 
        {
            await deleteProgramById(program._id.toString()).session(session);
        }

        const price = await TourPriceModel.findOne({ tour_id: id }).lean();

        await deletePriceById(price._id.toString()).session(session);

        const deleteTour= await deleteTourById(id).session(session);

        if(!deleteTour){
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({message:'Tour không tồn tại'}).end();
        }

        await session.commitTransaction();  
        session.endSession();
        
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

                // Lấy thông tin location

                const tourlocations= await TourLocationModel.find({tour_id: tour._id}).lean();
                const locationId=tourlocations.map(location=>location.location_id);
     
                const locations= await LocationModel.find({_id:{$in:locationId}}).lean();

                // Gộp thông tin
                return {
                    ...tour,
                    tourPrice: price,
                    tourPrograms: programs,
                    tourSchedules: schedules,
                    tourLocations: locations,
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
            name==undefined||
            code==undefined||
            type==undefined||
            dura==undefined||
            descri==undefined
          //!req.file
        ){
            console.log('Request body:', req.body);

            return res.status(400).json({message:'Thiếu thông tin Tour'}).end();
        }

        // Xu li file upload
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const coverImage=files['cover_image'] ? files['cover_image'][0] : null;
        const programImages = files['program_images'] || [];

        if(!coverImage){
            return res.status(400).json({message:'Thiếu ảnh bìa'}).end();
        }
        //tao Tour
        const tour=await createTour({
            tour_name: name,
            tour_code: code,
            tour_type: type,
            duration : dura,
            description: descri,
            policy_id: policy,
            cover_image: '/assets/'+coverImage.filename,
        }, session);

        //tao Price
        if(prices==null||prices==undefined||prices.adult_price==null||prices.children_price==null||prices.infant_price==null||prices.adult_price==undefined||prices.children_price==undefined||prices.infant_price==undefined){
            console.log('Prices:', prices);
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
            console.log('Programs:', programs);
            throw new Error('Thiếu Program');
        }
        let i=0;
        for(const program of programs){
            if(program.day_number==null||program.program_description==null||program.day_number==undefined||program.program_description==undefined){
                throw new Error('Thiếu thông tin Program');
            }

            await createProgram({
                tour_id: tour._id,
                day_number: program.day_number,
                program_description: program.program_description,
                image: '/assets/'+ (programImages[i] ? programImages[i].filename : coverImage.filename),//neu khong co anh cho program thi lay anh cua tour
            }, session);
            i++;
        }
        //tao Location trong nuoc
        if(!locations||!Array.isArray(locations)||locations.length===0){
            console.log('Locations:', locations);
            throw new Error('Thiếu Location');
        }
        for(const location of locations){
            if(location.location==null||location.location==undefined){
                throw new Error('Thiếu thông tin Location');
            }

            const foundLocation = await LocationModel.findOne({ location_name: location.location }).lean();
            if (!foundLocation) {
                throw new Error('Không tìm thấy Location: '+location.location);
            }
            //Tạo TourLocation với ID của Location
            await createTourLocation(tour._id.toString(), foundLocation._id.toString(), session);
        }

        //commit transaction    
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json('Tạo tour và các dữ liệu liên quan thành công!').end();
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


           // Lấy thông tin location

           const tourlocations= await TourLocationModel.find({tour_id: tourDetails._id}).lean();
           const locationId=tourlocations.map(location=>location.location_id);

           const locations= await LocationModel.find({_id:{$in:locationId}}).lean();

              // Gộp thông tin
            const result = {
                ...tourDetails,
                tourPrice: price,
                tourPrograms: programs,
                tourSchedules: schedules,
                tourLocations: locations,
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
        let filterResults = [];
        if (filters) {
        filterResults = await filterTours(filters);
        } else{
            filterResults =  await TourModel.find().exec(); 
        }
        if (filterResults.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy tour' }).end();
        }
        const filteredTours = searchResults.filter((searchTour) =>
            filterResults.some((filterTour) => filterTour._id.toString() === searchTour._id.toString())
        );      
        
        const tourIds = filteredTours.map((tour: any) => tour._id);
        
        const [tourPrices, programs, schedules] = await Promise.all([
            TourPriceModel.find({ tour_id: { $in: tourIds } }).lean(),
            TourProgramModel.find({ tour_id: { $in: tourIds } }).lean(),
            ScheduleModel.find({ tour_id: { $in: tourIds } }).lean(),
        ]);
        
        // Kết hợp dữ liệu từ tourPrices, programs, schedules vào filteredTours
        const Tours = filteredTours.map((tour: any) => {
            const price = tourPrices.find((p: any) => p.tour_id.toString() === tour._id.toString());
            const program = programs.find((p: any) => p.tour_id.toString() === tour._id.toString());
            const schedule = schedules.filter((s: any) => s.tour_id.toString() === tour._id.toString());
            console.log(schedule)

            return {
                ...tour.toObject(),
                price: price
                    ? {
                          adult_price: price.adult_price?.toString(),
                          children_price: price.children_price?.toString(),
                          infant_price: price.infant_price?.toString(),
                      }
                    : null,
                program: program || null,
                schedule: schedule || null,
            };
        });
        
        return res.status(200).json(Tours);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Lỗi', error });
    }
};
