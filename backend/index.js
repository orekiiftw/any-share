import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { promises as fs } from 'fs';
import randomstring from 'randomstring';
import mongoose from 'mongoose';
import connectDB from './db.js';
import uploadFileRouter from './routers/uploadFile.js';
import uploadTextRouter from './routers/uploadText.js';
import fetchContentRouter from './routers/fetchContent.js';

const app = express();
connectDB();

app.use(cors({
  origin: 'https://any-share-eight.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api/upload-file', uploadFileRouter);
app.use('/api/upload-text', uploadTextRouter);
app.use('/api/fetch-content', fetchContentRouter);

fs.mkdir('uploads', { recursive: true }).catch(console.error);

// Export the app for Vercel serverless functions
export default app;
