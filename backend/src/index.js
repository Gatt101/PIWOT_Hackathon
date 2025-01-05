import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { connectDB } from "./lib/db.js";

import authRoutes from './routes/auth.js';
import messageRoutes from './routes/message.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(
  cors({    
  origin:"http://localhost:5173",
  credentials: true
}))


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)


app.listen(PORT, () => {
  console.log(`Serever is running on port ${PORT}`);
  connectDB();
})