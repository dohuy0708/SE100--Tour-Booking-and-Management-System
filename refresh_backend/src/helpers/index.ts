import crypto from 'crypto';


const SECRET='5HBANANA';


export const random=()=>crypto.randomBytes(128).toString('base64');
export const authentication=(salt:string, password:string)=>{
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};
//tao random 6 so
export const randomCode=()=>Math.floor(100000 + Math.random() * 900000);