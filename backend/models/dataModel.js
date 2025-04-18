import mongoose from "mongoose";
import {Schema} from "mongoose";



const dataSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  data: {
    type: Schema.Types.Mixed,
    required: true
  },
  type: {
    type: String,
    enum: ["File", "Text"],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1800
  }
  
});

const Data = mongoose.model('Data', dataSchema);

export default Data;