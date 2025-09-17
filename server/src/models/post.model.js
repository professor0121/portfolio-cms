import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // References the User model
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        tags: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Tag",
            default: [],
        },
        featuredImage: {
            url: {
                type: String,
                default: "",
            },
            alt: {
                type: String,
                default: "",
            },
        },
        publishStatus: {
            type: String,
            enum: ["published", "draft"],
            default: "draft",
            required: true
        },
        views: {
            type: Number,
            default: 0,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
        review:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
