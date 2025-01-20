import express from 'express';
import { createNewPrice, updatePrice, deletePrice, getAllPrices } from '../controllers/tour_priceController';

export default (router: express.Router) => {
    router.post('/prices', createNewPrice as any);
    router.patch('/prices/:id', updatePrice as any);
    router.delete('/prices/:id', deletePrice as any);
    router.get('/prices', getAllPrices as any);
}