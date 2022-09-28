import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoutes from "../routes/postRoutes.js";
import userRoutes from "../routes/userRoutes.js";
const server = express();

server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use("/api", postRoutes);
server.use("/api", userRoutes);

server.use((err, req, res, next) => {
  return res.status(500).json({ message: "Something went wrong" });
});

server.get("/", (req, res) => {
  return res.status(200).json({ message: "OK" });
});

export default server;
