import mongoose, { Schema } from "mongoose"

const postSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Post = mongoose.model("Post", postSchema)