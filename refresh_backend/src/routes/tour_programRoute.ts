import express from 'express';
import { createNewProgram, deleteProgram, updateProgram, getAllPrograms } from 'controllers/tour_programController';

export default (router: express.Router) => {
    
    router.post('/programs', createNewProgram as any);
    router.patch('/programs/:id', updateProgram as any);
    router.delete('/programs/:id', deleteProgram as any);
    router.get('/programs', getAllPrograms as any);
}