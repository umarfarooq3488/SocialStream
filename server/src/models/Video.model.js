import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import paginate from "mongoose-paginate-v2";

const videoSchema = new Schema({
    videoFile: {
        type: String, //cloudinary url
        required: true
    },
    thumbnail: {
        type: String, //cloudinary url
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

videoSchema.plugin(mongooseAggregatePaginate);
videoSchema.plugin(paginate);


export const Video = mongoose.model("Video", videoSchema);