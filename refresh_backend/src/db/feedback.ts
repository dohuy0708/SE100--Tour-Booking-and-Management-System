import mongooser from "mongoose";

const FeedbackSchema = new mongooser.Schema({
    customer_id:{type: mongooser.Schema.Types.ObjectId, ref: 'User', required: true},
    tour_id:{type: mongooser.Schema.Types.ObjectId, ref: 'Tour', required: true},
    feedback_content:{type: String, required: true},
    feedback_date:{type: Date, required: true},
});


export const FeedbackModel = mongooser.model('Feedback', FeedbackSchema);

export const createFeedback=(values: Record<string, any>)=> new FeedbackModel(values)
.save().then((Feedback)=>Feedback.toObject());

export const updateFeedbackById=(feedback_id:string, values: Record<string, any>)=> FeedbackModel.findByIdAndUpdate(feedback_id, values);

export const deleteFeedbackById=(feedback_id:string)=>FeedbackModel.findByIdAndDelete({_id: feedback_id});

export const getFeedbacks=()=>FeedbackModel.find();

export const getFeedbackById=(feedback_id:string)=>FeedbackModel.findById(feedback_id);

export const getFeedbackWithDetails=()=>{
    FeedbackModel.find().populate('customer_id').populate('tour_id');
}

export const getFeedbackByIdWithDetails=(feedback_id:string)=>{
    FeedbackModel.findById(feedback_id).populate('customer_id').populate('tour_id');
}