import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  image: { url: { type: String }, alt: { type: String, default: "" } },
  link: { type: String, default: "#" },
  position: { type: String, enum: ["header", "sidebar", "footer"], default: "sidebar" },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  isActive: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 }
}, { timestamps: true });

const Ad = mongoose.model("Ad", adSchema);
export default Ad;
