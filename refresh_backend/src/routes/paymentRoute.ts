import express from 'express';
import { createNewPayment, updatePayment, deletePayment, getAllPayments, createPaymentUrl } from '../controllers/paymentController';

export default (router: express.Router) => {
    router.post('/payments', createNewPayment as any);
    router.patch('/payments/:id', updatePayment as any);
    router.delete('/payments/:id', deletePayment as any);
    router.get('/payments', getAllPayments as any);
    router.get('/payment/:booking_id', createPaymentUrl as any);
}