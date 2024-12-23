import express from 'express';
import { createNewPayment, updatePayment, deletePayment, getAllPayments } from '../controllers/paymentController';

export default (router: express.Router) => {
    router.post('/payments', createNewPayment as any);
    router.patch('/payments/:id', updatePayment as any);
    router.delete('/payments/:id', deletePayment as any);
    router.get('/payments', getAllPayments as any);
}