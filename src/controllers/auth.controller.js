import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import transporter from "../utils/nodemailer.js";

export const Signup = async (req,res) =>{
    const {fullName, email, password} = req.body;
    try {

        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        if(password.length < 6){
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            })
        }

        const user = await User.findOne({email});

        if(user) return res.status(400).json({message: "Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        });

        if(newUser){
            //generate jwt token here.
            generateToken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

        }else{
            res.status(400).json({message: "Invalid user data"});
        }

        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const Login = async(req,res) =>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message:"All fields required"});
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({message: "Internal server error"});
        
    }
}

export const Logout = (req,res) =>{
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
        
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const ForgotPassword = async(req,res)=>{
    const {email} = req.body;
    let resetLink;
    try {
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        // console.log(email);
        const user = await User.findOne({ email });
        console.log(user);
        if(!user){
           return res.status(404).json({error: "Email not found"})
        }

        //generate reset token
        const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "5m",
        });

        if(process.env.NODE_ENV === "production"){
            resetLink = `https://p-chat-pro.onrender.com/forgot-password/reset-password/${user._id}/${jwtToken}`;
        }
        
        resetLink = `http://localhost:5173/forgot-password/reset-password/${user._id}/${jwtToken}`;

        // Email template
        const mailOptions = {
            from: '"Reset Your Password" <P-Chat-Pro>',
            to: email,
            subject: "Reset Password Link - P-Chat-Pro",
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset Your Password - P-Chat-Pro</title>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
                    .container { max-width: 500px; margin: 30px auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center; }
                    h2 { color: #002D74; }
                    p { font-size: 16px; color: #555; }
                    .button { display: inline-block; margin-top: 15px; padding: 12px 20px; background-color: #002D74; color: #fff; text-decoration: none; font-weight: bold; border-radius: 5px; }
                    .footer { margin-top: 20px; font-size: 12px; color: #888; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>P-Chat-Pro - Password Reset</h2>
                    <p>Your email: <strong>${email}</strong></p>
                    <p>You requested to reset your password. Click the button below to proceed:</p>
                    <a class="button" href="${resetLink}">Reset Password</a>
                    <p>If you didn’t request this, you can safely ignore this email.</p>
                    <p class="footer">© 2025 P-Chat-Pro. All rights reserved.</p>
                </div>
            </body>
            </html>
            `,
        };

        //send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Password reset email sent successfully" });

    } catch (error) {
        console.error("Error in ForgotPassword:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const VerifyJWTToken = async(req,res)=>{
    try {
        const {token} = req.body;
        if(!token){
            return res.status(400).json({ message: "Token is required" });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) {
              return res.status(401).json({ message: "Link expired" });
            }
            res.status(200).json({ message: "Valid Link" });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateProfilePic = async (req,res) =>{
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"});
        }

        const user = await User.findById(userId);
        
        // Delete the old profile picture from Cloudinary
        if (user.profilePicId) {
            await cloudinary.uploader.destroy(user.profilePicId);
        }

        // Upload the new profile picture
        const uploadResponse = await cloudinary.uploader.upload(profilePic,{
            folder: "p-chat-pro",
            public_id: `${userId}_profile`,
            // transformation: [
            //     { width: 300, height: 300, crop: 'fill' },
            //     { quality: 'auto:low' },
            // ],
        });
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url, profilePicId:uploadResponse.public_id}, {new:true}).select("-password");
        
        res.status(200).json(updatedUser);
        
    } catch (error) {
        res.status(500).json({message:"Internal Server error"});
    }
}

export const updateProfileInfo = async(req,res)=>{
    try {
        const profile = req.body;
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({message:"Profile pic is required"});
        }

        const updatedInfo = await User.findByIdAndUpdate(userId,{fullName: profile.fullName, bio: profile.bio},{new:true}).select("-password");
        res.status(200).json(updatedInfo);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const checkAuth = async(req, res) =>{
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}