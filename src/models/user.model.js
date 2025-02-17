import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,
        },
        fullName:{
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        profilePic:{
            type: String,
            default:""
        },
        profilePicId:{
            type: String,
            default: null
        },
        friends: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        }],
        friendRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        notifications: [
            {
              type: { type: String },
              message: String,
              createdAt: { type: Date, default: Date.now },
            },
        ],
        sendRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        bio:{
            type: String,
            maxlength:100
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User",userSchema);

export default User;