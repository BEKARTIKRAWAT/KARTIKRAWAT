import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true },
  likes: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Like", likeSchema);