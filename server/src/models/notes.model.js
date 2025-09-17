import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        comments: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
        review: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
        tags: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Tag",
            default: [],
        },
        publishStatus: {
            type: String,
            enum: ["published", "draft"],
            default: "draft",
            required: true
        },
    },
    { timestamps: true }
);

const Notes = mongoose.model("Note", noteSchema);
export default Notes;


// requird logic for pdf files needs and also with the server