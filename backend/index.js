import express from "express";
import cors from "cors";
import multer from "multer";
import { promises as fs } from "fs";
import randomstring from 'randomstring';
import mongoose from 'mongoose';
import connectDB from './db.js';
import uploadFileRouter from './routers/uploadFile.js';
import uploadTextRouter from './routers/uploadText.js';
import fetchContentRouter from './routers/fetchContent.js';





const app = express();
connectDB();



app.use(cors({
  origin: "https://any-share-eight.vercel.app", // Allow only your frontend domain
  methods: ["GET", "POST", "OPTIONS"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
}));


app.use(express.json());

app.use("/api/upload-file", uploadFileRouter)
app.use("/api/upload-text", uploadTextRouter)
app.use("/api/fetch-content", fetchContentRouter)


fs.mkdir("uploads", { recursive: true }).catch(console.error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));