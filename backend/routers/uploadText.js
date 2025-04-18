import express from 'express';
import randomstring from 'randomstring';
import Data from '../models/dataModel.js';

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }
    console.log("Received text:", text);
    const token = randomstring.generate({
      length: 6,
      charset: 'alphanumeric'
    });
    
    const dbResponse = await Data.create(
      { 
        token,
        data: {
          text
        },
        type: "Text"
      }
    );
    
    console.log("Database response:", dbResponse);
    
    res.json({ message: "Text received successfully", dbResponse });
  } catch (error) {
    console.error("Text upload error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
