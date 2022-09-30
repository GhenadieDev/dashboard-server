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

server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use("/api", postRoutes);
server.use("/api", userRoutes);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use((err, req, res, next) => {
  return res.status(500).json({ message: "Something went wrong" });
});

export default server;
