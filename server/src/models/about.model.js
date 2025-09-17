import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Beginner",
    },
  },
  { _id: false } 
);

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    profileImage: { url: { type: String, default: "" }, alt: { type: String, default: "" } },
  },
  { _id: false }
);

const timelineSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: Date, required: true },
  },
  { _id: false }
);

const aboutSchema = new mongoose.Schema(
  {
    title: { type: String, default: "About Me", trim: true },
    description: { type: String, default: "", trim: true },
    skills: [skillSchema],
    teamMembers: [teamMemberSchema],
    timeline: [timelineSchema],
    profileImage: { url: { type: String, default: "" }, alt: { type: String, default: "" } },
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);
export default About;
