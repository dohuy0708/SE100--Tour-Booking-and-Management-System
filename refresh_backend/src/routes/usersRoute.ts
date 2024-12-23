import express from 'express';
import { deleteUser, getAllUsers, updateUser } from '../controllers/userController';
import { isAuthenticated, isOwner } from '../middleware';

export default (router: express.Router) => {
    router.get('/users',isAuthenticated ,getAllUsers as any);
    router.delete('/users/:id',isAuthenticated,isOwner, deleteUser as any);
    router.patch('/users/:id',isAuthenticated,isOwner, updateUser as any);
}