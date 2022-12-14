import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../schemas/userSchema.js";
import checkUserByEmail from "../middlewares/checkUserByEmail.js";
import checkToken from "../middlewares/checkToken.js";

const route = express.Router();

route.post("/users", checkUserByEmail, async (req, res, next) => {
  let newUser = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    gender: req.body.gender,
    password: await bcrypt.hash(req.body.password, 8),
  };

  try {
    const user = await new User(newUser).save();
    if (user) {
      newUser = {};
      return res.status(201).json({ message: "User saved successfully" });
    }
  } catch (error) {
    next(error);
  }
});

route.get("/users/login", async (req, res, next) => {
  const { email, password } = req.query;
  let isValidPassword = false;

  try {
    const foundUser = await User.findOne({
      email,
    }).exec();

    if (foundUser) {
      isValidPassword = await bcrypt.compare(password, foundUser.password);
    }

    if (!foundUser || !isValidPassword) {
      return res
        .status(401)
        .json({ message: "Invalid credentials, try again" });
    }

    const token = jwt.sign(
      { userId: foundUser._id, role: foundUser.role },
      process.env.JWT_SECRET
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({ data: foundUser });
  } catch (error) {
    next(error);
  }
});

route.get("/users", checkToken, async (req, res, next) => {
  try {
    const users = await User.find({}).exec();
    if (users.length > 0) {
      return res.status(200).json({ data: users });
    }
  } catch (error) {
    next(error);
  }
});

route.get("/users/current", checkToken, async (req, res, next) => {
  const { userId } = req.decoded;

  try {
    const user = await User.findById(userId).exec();
    if (user) {
      return res.status(200).json({ data: user });
    }
  } catch (error) {
    next(error);
  }
});

route.get("/users/logout", checkToken, async (req, res) => {
  res.clearCookie("token", {
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Logged out successfully" });
});

export default route;
