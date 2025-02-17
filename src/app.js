import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import { app } from "./utils/socket.js";
 
// const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(urlencoded({
    extended: true,
    limit: '2mb'
}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());

// app.get("/",(req,res)=>{
//     res.send("welcome pchatpro");
// })

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/user",userRoutes);


export default app;
