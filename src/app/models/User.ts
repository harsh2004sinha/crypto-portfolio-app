import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
}

const userSchema: Schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema)

export default User