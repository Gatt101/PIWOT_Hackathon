import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from "./lib/db.js";
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/message.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)


app.listen(PORT, () => {
  console.log(`Serever is running on port ${PORT}`);
  connectDB();
})