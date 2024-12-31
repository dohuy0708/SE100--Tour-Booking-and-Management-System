import express from 'express';
import { deleteUser, getAllUsers, updateUser, createStaff } from '../controllers/userController';
import { isAuthenticated, isOwner } from '../middleware';
import { GroupNames } from '../db/group';
import { authorize } from '../middleware/role_middleware';


export default (router: express.Router) => {
    router.get('/users',isAuthenticated, authorize([GroupNames.ADMIN, GroupNames.STAFF]),getAllUsers as any);
    router.delete('/users/:id',isAuthenticated,isOwner, deleteUser as any);
    router.patch('/users/:id',isAuthenticated,isOwner, updateUser as any);

    router.get('/admin', isAuthenticated, authorize([GroupNames.ADMIN]), (req, res) => {
        res.json({ message: 'Welcome Admin' });
    });
    
    router.get('/staff', isAuthenticated, authorize([GroupNames.STAFF]), (req, res) => {
        res.json({ message: 'Welcome Staff' });
    });

    router.get('/customer', isAuthenticated, authorize([GroupNames.CUSTOMER]), (req, res) => {
        res.json({ message: 'Welcome Customer' });
    });

    router.post('/createstaff', isAuthenticated, authorize([GroupNames.ADMIN]), createStaff as any);
}