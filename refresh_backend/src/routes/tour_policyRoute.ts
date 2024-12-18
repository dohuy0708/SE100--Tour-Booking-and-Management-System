import express from 'express';
import { createNewPolicy, deletePolicy, updatePolicy, getAllPolicies } from 'controllers/tour_policyController';


export default (router: express.Router) => {
    router.post('/policies', createNewPolicy as any);
    router.patch('/policies/:id', updatePolicy as any);
    router.delete('/policies/:id', deletePolicy as any);
    router.get('/policies', getAllPolicies as any);
}