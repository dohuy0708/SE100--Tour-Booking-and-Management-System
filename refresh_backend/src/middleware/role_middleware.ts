import { Request, Response, NextFunction } from "express";
import { GroupModel } from "../db/group";
import { GroupNames } from "../db/group";
import { GroupRoleModel } from "../db/group_role";
import merge from 'lodash';


interface CustomRequest extends Request {
    identity?: {
      id: string;
      group_id: string;
      [key: string]: any;
    };
  }

export const authorize=(requiredRole: string[])=>{
    return async(req: Request, res: Response, next: NextFunction)=>{
        try{
            const user=(req as CustomRequest).identity;
            if(!user||!user.group_id){
                res.status(401).json({message:'Forbidden: No Group assigned'}).end();
                return;
            }

            // const groupRoles=await GroupRoleModel.find({group_id: user.group_id})
            // .populate<{role_id: {role_description: string}}>('role_id','role_description');

            // const userRoles=groupRoles.map((gr)=>gr.role_id.role_description);

            // const hasRole=requiredRole.some((role)=>userRoles.includes(role));

            const hasRole=requiredRole.includes(user.role);
            if(!hasRole){
                res.status(403).json({message:'Forbidden: You dont have the required permission'}).end();
                return;
            }

            next();

        }
        catch(error){
            res.status(500).json({message:'Authorization check failed'}).end();
        }
    };
}