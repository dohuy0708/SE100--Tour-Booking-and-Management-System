import mongooser from "mongoose";

const RoleSchema = new mongooser.Schema({
    role_description:{type: String, required: true},
    role_url:{type: String},

});

export const RoleModel = mongooser.model('Role', RoleSchema);

export const createRole=(values: Record<string, any>)=> new RoleModel(values)
.save().then((role)=>role.toObject());

export const updateRoleById=(role_id:string, values: Record<string, any>)=> RoleModel.findByIdAndUpdate(role_id, values);

export const deleteRoleById=(role_id:string)=>RoleModel.findByIdAndDelete({_id: role_id});

export const getRoles=()=>RoleModel.find();