import app from './app.js';
import express from "express";
import dotenv from 'dotenv';
import { dbConnect } from './config/db.connect.js';
import { server } from './utils/socket.js';

dotenv.config();

const PORT = process.env.PORT || 4000;


server.listen(PORT,()=>{
    console.log("server is running on PORT:"+ PORT);
    dbConnect();
});