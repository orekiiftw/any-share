import express from "express";
import multer from "multer";
import { promises as fs } from "fs";
import randomstring from "randomstring";

import Data from "../models/dataModel.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const response = await fetch("https://api.gofile.io/servers");
    const data = await response.json();

    if (!data.data.servers || !data.data.servers[0]) {
      return res.status(500).json({ error: "No servers available from Gofile" });
    }

    const server = data.data.servers[0].name;

    const formData = new FormData();
    formData.append(
      "file",
      new Blob([req.file.buffer]),
      req.file.originalname
    );

    const uploadResponse = await fetch(
      `https://${server}.gofile.io/uploadFile`,
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadData = await uploadResponse.json();

    if (uploadData.status !== "ok") {
      return res.status(500).json({ error: "Failed to upload file to Gofile" });
    }

    const token = randomstring.generate({
      length: 6,
      charset: "alphanumeric",
    });

    const dbResponse = await Data.create({
      token,
      data: uploadData,
      type: "File",
    });

    res.json(dbResponse);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
