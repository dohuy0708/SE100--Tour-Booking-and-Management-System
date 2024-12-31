import express from 'express';
import { createNewProgram, deleteProgram, updateProgram, getAllPrograms } from '../controllers/tour_programController';
import upload from '../middleware/upload_middleware';


export default (router: express.Router) => {
    
    router.post('/programs',upload.single('image'), createNewProgram as any);
    router.patch('/programs/:id', updateProgram as any);
    router.delete('/programs/:id', deleteProgram as any);
    router.get('/programs', getAllPrograms as any);
}