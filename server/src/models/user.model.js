import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profileImage: {
            url: {
                type: String,
                default: "",
            },
        },
        bio: {
            type: String,
            default: "",
            maxlength: 500,
        },
        role: {
            type: String,
            enum: ["user", "admin", "instructor"],
            default: "user",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
