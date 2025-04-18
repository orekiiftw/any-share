import express from 'express';
import Data from '../models/dataModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { token } = req.query;
    console.log(token)
    const data = await Data.find({ token });
    res.json({
      data
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router