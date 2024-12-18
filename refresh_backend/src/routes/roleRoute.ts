import express from 'express';
import { createNewRole, deleteRole, updateRole, getAllRoles } from 'controllers/roleController';


export default (router: express.Router) => {
    router.post('/roles', createNewRole as any);
    router.patch('/roles/:id', updateRole as any);
    router.delete('/roles/:id', deleteRole as any);
    router.get('/roles', getAllRoles as any);
}