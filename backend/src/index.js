import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import path from "path";
import newsRoute from './routes/news.js';
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

import authRoutes from './routes/auth.js';
import messageRoutes from './routes/message.js';

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(
  cors({    
  origin:"http://localhost:5173",
  credentials: true
}))


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api",newsRoute);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
  })
}


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
})