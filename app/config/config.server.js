import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoutes from "../routes/postRoutes.js";
import userRoutes from "../routes/userRoutes.js";
const server = express();

/*const corsOptions = {
  origin: function (origin, callback) {
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true,
  origin: "http://localhost:3000",
};*/

server.use(cors({ credentials: true, origin: "http://localhost:3000" }));
server.use(express.json());
server.use(cookieParser());
server.use("/api", postRoutes);
server.use("/api", userRoutes);

server.use((err, req, res, next) => {
  return res.status(500).json({ message: "Something went wrong" });
});

export default server;
