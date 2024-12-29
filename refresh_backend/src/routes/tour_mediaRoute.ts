import express from 'express';
import { createNewMedia, deleteMedia, updateMedia, getAllMedias } from '../controllers/tour_mediaController';
import upload from '../middleware/upload_middleware';

export default (router: express.Router) => {
    router.post('/tour_medias', upload.single('cover'),createNewMedia as any);
    router.patch('/tour_medias/:id', upload.single('cover'),updateMedia as any);
    router.delete('/tour_medias/:id', deleteMedia as any);
    router.get('/tour_medias', getAllMedias as any);
}