import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag", // Reference the Tag model
            }
        ],
        price: { type: Number, default: 0 },
        duration: { type: String, default: "" }, // e.g., "3h 20m"
        featuredImage: { url: String, alt: String },
        isPublished: { enum:["published","draft"],default:"draft" },
        students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        ratings: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                rating: { type: Number, min: 1, max: 5 },
                review: { type: String },
            },
        ],
    },
    { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
