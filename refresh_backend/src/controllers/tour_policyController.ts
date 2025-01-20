import { createPolicy, updatePolicyById, deletePolicyById, getPolicies } from '../db/tour_policy';
import express from "express";

export const getAllPolicies = async (req: express.Request, res: express.Response) => {

    try{
            const policies=await getPolicies();
            return res.status(200).json(policies).end();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message:'Lỗi'}).end();
        }
}

export const createNewPolicy = async (req: express.Request, res: express.Response) =>{
    try{
        const {name, type, ctent}=req.body;

        if(name==null||!type==null||!ctent==null){
            return res.status(400).json({message:'Thiếu thông tin Policy'}).end();
        }

        const policy= await createPolicy({
            policy_name:name,
            policy_type:type,
            policy_content:ctent,
        });

        return res.status(200).json(policy).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}

export const updatePolicy = async (req: express.Request, res: express.Response) =>{

    try{
        const {id}=req.params;  
        const {policy_name, policy_type, content}=req.body;

        if(!policy_name||!policy_type||!content){
            return res.status(400).json({message:'Thiếu thông tin Policy'}).end();
        }

        const policy= await updatePolicyById(id, {policy_name, policy_type, content});

        if(!policy){
            return res.status(400).json({message:'Policy không tồn tại'}).end();
        }
        await policy.save();

        return res.status(200).json(policy).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }

}

export const deletePolicy = async (req: express.Request, res: express.Response) =>{
    try{
        const {id}=req.params;
        const deletePolicy= await deletePolicyById(id);
        return res.status(200).json(deletePolicy).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:'Lỗi'}).end();
    }
}