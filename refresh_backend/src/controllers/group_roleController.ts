import { createGroupRole, getGroupRoles, deleteGroupRole } from "../db/group_role";
import express from "express";

export const getAllGroupRoles = async (req: express.Request, res: express.Response) => {
    try{
            const groupRoles=await getGroupRoles();
            return res.status(200).json(groupRoles).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewGroupRole = async (req: express.Request, res: express.Response) =>{
    try{
        const {group_id, role_id}=req.body;

        if(!group_id || !role_id){
            return res.status(400).json({message:'Thiếu thông tin Group hoặc Role'}).end();
        }

        const groupRole= await createGroupRole(group_id, role_id);

        return res.status(200).json(groupRole).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }

}

export const removeGroupRole = async (req: express.Request, res: express.Response) => {
    const { groupId, roleId } = req.body;

    if (!groupId || !roleId) {
        return res.status(400).json({
            message: 'Thiếu thông tin groupId hoặc roleId.',
            status: 'failed',
        });
    }

    try {
        const result = await deleteGroupRole(groupId, roleId);

        if (result.status === 'NOT_FOUND') {
            return res.status(404).json(result); 
        }

        return res.status(200).json(result); 
    } catch (error) {
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi xóa quan hệ giữa Group và Role.',
            status: 'failed',
            error: error.message,
        });
    }
}

