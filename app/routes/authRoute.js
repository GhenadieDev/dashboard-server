import express from "express";
import checkToken from "../middlewares/checkToken.js";

const route = express.Router();

route.get("/auth", checkToken, (req, res) => {
  return res.status(200).json({ msg: "ok" });
});

export default route;
