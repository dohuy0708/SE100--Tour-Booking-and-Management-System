import express from 'express';
import { createNewTour, updateTour, deleteTour, getAllTours, getTourByTourCode, getTourWithProgram } from '../controllers/tourController';

export default (router: express.Router) => {
    router.post('/tours', createNewTour as any);
    router.patch('/tours/:id', updateTour as any);
    router.delete('/tours/:id', deleteTour as any);
    router.get('/tours', getAllTours as any);
    router.get('/tours/findbytour_code', getTourByTourCode as any);
    router.get('/tours/programs',getTourWithProgram as any);
}