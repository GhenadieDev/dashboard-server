import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Posts", postSchema);

export default Post;
