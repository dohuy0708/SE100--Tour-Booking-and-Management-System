import mongooser from "mongoose";

const TourPolicySchema = new mongooser.Schema({
    policy_type:{
        type: [String],
        enum:['DOMESTIC','INTERNATIONAL'],
        required: true,
    },
    policy_content:{type: String, required: true},
});

export const PolicyTypes={
    DOMESTIC:'DOMESTIC',
    INTERNATIONAL:'INTERNATIONAL',
};

export const TourPolicyModel = mongooser.model('TourPolicy', TourPolicySchema);

export const createPolicy=(values: Record<string, any>)=> new TourPolicyModel(values)
.save().then((policy)=>policy.toObject());

export const updatePolicyById=(policy_id:string, values: Record<string, any>)=> TourPolicyModel.findByIdAndUpdate(policy_id, values);

export const deletePolicyById=(policy_id:string)=>TourPolicyModel.findByIdAndDelete({_id: policy_id});

export const getPolicies=()=>TourPolicyModel.find();