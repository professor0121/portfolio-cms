import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // reviewer is required
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      trim: true,
      default: "",
    },
    targetType: {
      type: String,
      enum: ["Post", "Course", "Note"], 
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, // the ID of the Post/Course/Note
      refPath: "targetType", // dynamic reference
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
