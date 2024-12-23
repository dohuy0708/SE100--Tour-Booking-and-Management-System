import express from 'express';
import { getAllGroupRoles, createNewGroupRole, removeGroupRole } from '../controllers/group_roleController';


export default (router: express.Router) => {
    router.get('/group_roles', getAllGroupRoles as any);
    router.post('/group_roles', createNewGroupRole as any);
    router.delete('/group_roles', removeGroupRole as any);
}