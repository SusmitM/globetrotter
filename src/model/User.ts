import mongoose, {Schema,Document} from "mongoose";



export interface User extends Document{
    username:string;
    email:string;
    password?:string;
    verifyCode?:string;
    verifyCodeExpiry?:Date;
    isVerified:boolean;
    invitedBy?: string;  
    highScore: number;
}



const UserSchema: Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/^\S+@\S+\.\S+$/,"Please use a valid email address"],
    },
    password:{
        type:String,
    },
    verifyCode:{
        type:String,
    },
    verifyCodeExpiry:{
        type:Date,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    invitedBy:{
        type:String,
        required:false,
    },
      highScore:{
        type:Number,
        default:0,
    }
})

const UserModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)


export default UserModel