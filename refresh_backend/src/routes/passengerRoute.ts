import { createNewPassenger, updatePassenger, deletePassenger, getAllPassengers } from './../controllers/passengerController';
import express from 'express';

export default (router: express.Router) => {
    
    router.get('/passengers', getAllPassengers as any);
    router.post('/passengers', createNewPassenger as any);
    router.patch('/passengers/:id', updatePassenger as any);
    router.delete('/passengers/:id', deletePassenger as any);
}