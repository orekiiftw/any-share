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


const allowedOrigins = [
  'http://localhost:5173', // Your local dev environment (replace port)
  'https://your-netlify-site-name.netlify.app', // Your deployed Netlify frontend
  // Add any other domains you need to allow
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl) or from allowed list
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Ensure POST is allowed
  credentials: true, // Set to true if you need to allow cookies/authorization headers
  optionsSuccessStatus: 204 // Standard success status for OPTIONS preflight requests
};

app.use(cors(corsOptions)); 
app.use(express.json());

app.use("/api/upload-file", uploadFileRouter)
app.use("/api/upload-text", uploadTextRouter)
app.use("/api/fetch-content", fetchContentRouter)


fs.mkdir("uploads", { recursive: true }).catch(console.error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));