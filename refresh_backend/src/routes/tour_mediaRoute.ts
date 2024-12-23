import express from 'express';
import { createNewMedia, deleteMedia, updateMedia, getAllMedias } from '../controllers/tour_mediaController';

export default (router: express.Router) => {
    router.post('/tour_medias', createNewMedia as any);
    router.patch('/tour_medias/:id', updateMedia as any);
    router.delete('/tour_medias/:id', deleteMedia as any);
    router.get('/tour_medias', getAllMedias as any);
}