import mongooser from "mongoose";

const GroupRoleSchema = new mongooser.Schema({
    group_id:{type: mongooser.Schema.Types.ObjectId, ref: 'Group', required: true},
    role_id:{type: mongooser.Schema.Types.ObjectId, ref: 'Role', required: true},

});

export const GroupRoleModel = mongooser.model('GroupRole', GroupRoleSchema);

export const createGroupRole=async(groupId:string, roleId:string)=>{
    try{
        const existingGroupRole = await GroupRoleModel.findOne({group_id: groupId, role_id: roleId});
        if(existingGroupRole){
            return {message: 'Đã tồn tại quan hệ giữa Group và Role', status:'existed'};
        }

        //neu chua co
        const newGroupRole = new GroupRoleModel({group_id: groupId, role_id: roleId});

        await newGroupRole.save();
        return {message: 'Tạo quan hệ giữa Group và Role thành công', status:'success'};
    }
    catch(error){
        return {message: 'Tạo quan hệ giữa Group và Role thất bại', status:'failed'};
    }
} 

export const getGroupRoles= async()=>{
    try{
        const groupRoles = await GroupRoleModel.find()
        .populate('group_id','group_name')
        .populate('role_id','role_description');
        return groupRoles;
    }
    catch(error){
        return {message: 'Lấy danh sách quan hệ giữa Group và Role thất bại', status:'failed'};
    }
}

export const deleteGroupRole = async (groupId:string, roleId:string)=>{
    try{
        const deletedRelation = await GroupRoleModel.findOneAndDelete({
            group_id: groupId,
            role_id: roleId,
        })

        if(!deletedRelation){
            return {message: 'Không có mối quan hệ này', status:'NOT_FOUND'};
        }
        return {message: 'Xóa quan hệ giữa Group và Role thành công', status:'success'};
    }
    catch(error){
        return {message: 'Xóa quan hệ giữa Group và Role thất bại', status:'failed'};
    }
}
