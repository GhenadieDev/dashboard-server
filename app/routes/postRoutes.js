import express from "express";
import Post from "../schemas/postSchema.js";
import checkToken from "../middlewares/checkToken.js";
const route = express.Router();

route.post("/posts", checkToken, async (req, res, next) => {
  try {
    let newPost = {
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      author: req.decoded.userId,
    };

    const createdPost = await new Post(newPost).save();
    if (createdPost) {
      newPost = {};
      return res.status(201).json({ message: "Post created successfully" });
    }
  } catch (error) {
    next(error);
  }
});

route.get("/posts", checkToken, async (req, res, next) => {
  const { userId, role } = req.decoded;
  try {
    if (role === "admin") {
      const allPosts = await Post.find({}).exec();
      return res.status(200).json({ data: allPosts });
    }
    const allPostsByUserId = await Post.find({ author: userId }).exec();
    return res.status(200).json({ data: allPostsByUserId });
  } catch (error) {
    next(error);
  }
});

route.get("/posts/public", checkToken, async (req, res, next) => {
  try {
    const allPosts = await Post.find({}).exec();
    return res.status(200).json({ data: allPosts });
  } catch (error) {
    next(error);
  }
});

route.get("/posts/:postId", checkToken, async (req, res, next) => {
  try {
    const foundPost = await Post.findById(req.params.postId).exec();
    if (foundPost) {
      return res.status(200).json({ data: foundPost });
    }
  } catch (error) {
    next(error);
  }
});

route.delete("/posts/:postId", checkToken, async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.postId).exec();
    return res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    next(error);
  }
});

route.patch("/posts/:postId", checkToken, async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body
    ).exec();
    return res.status(200).json({ data: updatedPost });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default route;
