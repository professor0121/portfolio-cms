import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", 
      default: null,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project", 
      default: null,
    },
    note: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note", 
      default: null,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null, 
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // createdAt and updatedAt
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
