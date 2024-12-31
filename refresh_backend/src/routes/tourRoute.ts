import express from 'express';
import { createNewTour, updateTour, deleteTour, getAllTours, getTourByTourCode, getAllTourWithDetail } from '../controllers/tourController';
import upload from '../middleware/upload_middleware';


export default (router: express.Router) => {
    router.post('/tours',upload.single('cover_image') ,createNewTour as any);
    router.patch('/tours/:id', updateTour as any);
    router.delete('/tours/:id', deleteTour as any);
    router.get('/tours', getAllTours as any);
    router.get('/tours/findbytour_code', getTourByTourCode as any);
    router.get('/tours/detail',getAllTourWithDetail as any);
}