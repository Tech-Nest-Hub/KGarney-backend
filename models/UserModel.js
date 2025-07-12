import mongoose from 'mongoose'


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 20,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minglength: 8,

        },
        avatar: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            default: "",
        }
    },
    { timestamps: true }
)

const User = mongoose.model("User", userSchema);
export default User;