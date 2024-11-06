import mongoose from "mongoose";
import { Password } from "../src/service/password";
interface UserAttrs
{
    email: string;
    password: string;
}
interface UserModel extends mongoose.Model<UserDoc>
{
    build(attrs: UserAttrs):UserDoc;
}
interface UserDoc extends mongoose.Document
{
    email: string;
    password: string;
}
const userSchema=new mongoose.Schema({
    email:
    {
        type:String,
        require: true
    },
    password:
    {
        type: String,
        require: true
    }
});
userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
      const password = this.get('password');
  
      if (typeof password === 'string') {
        const hashed = await Password.toHash(password);
        this.set('password', hashed);
      }
    }
    done();
  });
  


userSchema.statics.build=(attrs:UserAttrs)=>
{
    return new User(attrs);
}

const User=mongoose.model<UserDoc,UserModel>('User',userSchema);

export{User};