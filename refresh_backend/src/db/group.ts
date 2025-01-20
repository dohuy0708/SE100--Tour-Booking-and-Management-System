import mongooser from "mongoose";

const GroupSchema = new mongooser.Schema({
    group_name:{
        type: [String],
        enum:['ADMIN','CUSTOMER','STAFF'],
        required: true,
    }
});

export const GroupNames={
    ADMIN:'ADMIN',
    CUSTOMER:'CUSTOMER',
    STAFF:'STAFF',
};

export const GroupModel = mongooser.model('Group', GroupSchema);

export const createGroup=(values: Record<string, any>)=> new GroupModel(values)
.save().then((group)=>group.toObject());

export const updateGroupById=(group_id:string, values: Record<string, any>)=> GroupModel.findByIdAndUpdate(group_id, values);

export const deleteGroupById=(group_id:string)=>GroupModel.findByIdAndDelete({_id: group_id});

export const getGroups=()=>GroupModel.find();