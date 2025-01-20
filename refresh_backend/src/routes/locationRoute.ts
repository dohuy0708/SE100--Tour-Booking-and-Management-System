import express from 'express';
import { createNewLocation, updateLocation, deleteLocation, getAllLocations } from '../controllers/locationController';

export default (router: express.Router) => {
    
    router.post('/locations', createNewLocation as any);
    router.patch('/locations/:id', updateLocation as any);
    router.delete('/locations/:id', deleteLocation as any);
    router.get('/locations', getAllLocations as any);
}