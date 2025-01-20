import express from 'express';
import { createNewSchedule, updateSchedule, getAllSchedules, deleteSchedule, getScheduleByTheTourId, getEndSchedule, scheduleSearchAndFilter } from '../controllers/scheduleController';

export default (router: express.Router) => {
    
    router.post('/schedules', createNewSchedule as any);
    router.patch('/schedules', updateSchedule as any);
    router.delete('/schedules/:id', deleteSchedule as any);
    router.get('/schedules', getAllSchedules as any);
    router.get('/schedules/getbytour/:id', getScheduleByTheTourId as any);
    router.get('/schedules/end',getEndSchedule as any);
    router.get('/schedules/searchandfilter', scheduleSearchAndFilter as any); 
}