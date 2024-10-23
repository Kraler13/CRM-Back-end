import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUser {
    email: string;
    password: string;
  }

  export interface IUserDocument extends IUser, Document {
    _id: mongoose.Types.ObjectId;
    generateAuthToken(): string;
  }

  const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

  UserSchema.pre('save', function (next) {
    const user = this;
  
    if (!user.isModified('password')) {
      return next();
    }
  
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
  
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
  
        user.password = hash;
        next();
      })
    })
  })

  UserSchema.methods.generateAuthToken = function (): string {
    const user = this as IUserDocument;
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY || "defaultSecretKey", {expiresIn: "1h"});
        return token;
  };
  
  const User = mongoose.model<IUserDocument>("User", UserSchema);

export default User