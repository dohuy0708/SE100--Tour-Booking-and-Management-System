import mongooser from 'mongoose';

const UserSchema = new mongooser.Schema({  
    user_name: {type: String, required: true},
    email: {type: String, required: true},
    phone_number:{type: String, required: true},
    date_of_birth:{type: Date, required: true},
    authentication:{
        user_password: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false},
    },
    group_id:{type: mongooser.Schema.Types.ObjectId, ref: 'Group'},
});

export const UserModel = mongooser.model('User', UserSchema);


export const getUsers=()=>UserModel.find();
export const getUserByEmail=(email:string)=>UserModel.findOne({email});
export const getUserBySessionToken=(sessionToken:string)=>UserModel.findOne({
    'authentication.sessionToken':sessionToken,
});
export const getUserById=(user_id:string)=>UserModel.findById(user_id);
export const createUser=(values: Record<string, any>)=> new UserModel(values)
.save().then((user)=>user.toObject());
export const deleteUserById=(user_id:string)=>UserModel.findByIdAndDelete({_id: user_id});
export const updateUserById=(user_id:string, values: Record<string, any>)=> UserModel.findByIdAndUpdate(user_id, values);
