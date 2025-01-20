import express from 'express';
import { createNewGroup, deleteGroup, updateGroup, getAllGroups } from 'controllers/groupController';


export default (router: express.Router) => {
    router.get('/groups', getAllGroups as any);
    router.post('/groups', createNewGroup as any);
    router.patch('/groups/:id', updateGroup as any);
    router.delete('/groups/:id', deleteGroup as any);   
}