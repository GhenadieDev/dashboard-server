import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoutes from "../routes/postRoutes.js";
import userRoutes from "../routes/userRoutes.js";
const server = express();

/*server.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);*/

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Allow-Control-Allow-Credentials", "true");
  next();
});

server.use(express.json());
server.use(cookieParser());
server.use("/api", postRoutes);
server.use("/api", userRoutes);

server.use((err, req, res, next) => {
  return res.status(500).json({ message: "Something went wrong" });
});

export default server;
