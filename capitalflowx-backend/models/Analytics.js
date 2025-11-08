import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  page: String,
  ip: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Analytics", analyticsSchema);
