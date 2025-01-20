import express from 'express';
import { createNewTourLocation, getAllTourLocations, removeTourLocation } from 'controllers/tour_locationController';

export default (router: express.Router) => {
 
    router.get('/tour_locations', getAllTourLocations as any);
    router.post('/tour_locations', createNewTourLocation as any);
    router.delete('/tour_locations', removeTourLocation as any);
}