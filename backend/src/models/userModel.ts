import mongoose ,{ Schema, Document }from "mongoose";
import bcrypt from "bcrypt";

export interface UserDoc extends Document {
  name: string;
  email: string;
  password: string;
  matchPassword: (pw: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDoc>({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

},{
    timestamps:true
});

userSchema.methods.matchPassword = async function(enteredPassword:string){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre<UserDoc>('save', async function(next){

    //if password is not modified, then skip
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<UserDoc>('User',userSchema);
export default User;