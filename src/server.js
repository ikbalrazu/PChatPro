import app from './app.js';
import express from "express";
import dotenv from 'dotenv';
import { dbConnect } from './config/db.connect.js';
import { server } from './utils/socket.js';

import path from "path";

dotenv.config();

const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}



server.listen(PORT,()=>{
    console.log("server is running on PORT:"+ PORT);
    dbConnect();
});