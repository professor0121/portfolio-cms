import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      // optional
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    featuredImage: {
      url: { type: String, required: true }, // URL is required
      alt: { type: String, default: "" },
    },
    gallery: [
      {
        url: { type: String, required: true }, // each gallery item must have URL
        alt: { type: String, default: "" },
      },
    ],
    published: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    githubLink: {
      type: String,
      trim: true,
    },
    liveDemoLink: {
      type: String,
      trim: true,
    },
    views: {
      type: Number,
      default: 0
    },
   likes: [
             {
                 type: mongoose.Schema.Types.ObjectId,
                 ref: "Like",
             },
         ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
