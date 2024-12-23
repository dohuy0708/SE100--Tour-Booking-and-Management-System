import express from 'express';
import { createNewFeedback, updateFeedback, deleteFeedback, getAllFeedbacks, getFeedbackByIdWithTheDetails} from '../controllers/feedbackController';

export default (router: express.Router) => {
    router.post('/feedbacks', createNewFeedback as any);
    router.patch('/feedbacks/:id', updateFeedback as any);
    router.delete('/feedbacks/:id', deleteFeedback as any);
    router.get('/feedbacks', getAllFeedbacks as any);
    router.get('/feedbacks/:id', getFeedbackByIdWithTheDetails as any);
}