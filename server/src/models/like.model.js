import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Dynamic reference: Post, Course, or Project
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "targetModel",
    },
    targetModel: {
      type: String,
      required: true,
      enum: ["Post", "Course", "Project"], // models that can be liked
    },
    type: {
      type: String,
      enum: ["like", "dislike"],
      default: "like",
    },
  },
  { timestamps: true }
);

// Prevent duplicate likes from same user on same target
likeSchema.index({ user: 1, targetId: 1, targetModel: 1 }, { unique: true });

const Like = mongoose.model("Like", likeSchema);

export default Like;
