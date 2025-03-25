import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import paginate from "mongoose-paginate-v2"
const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    commentedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

commentSchema.plugin(mongooseAggregatePaginate)
commentSchema.plugin(paginate)

export const Comment = mongoose.model("Comment", commentSchema)