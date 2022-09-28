import User from "../schemas/userSchema.js";

const checkUserByEmail = async (req, res, next) => {
  try {
    const email = await User.findOne({ email: req.body.email })
      .select("email")
      .exec();

    if (email) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default checkUserByEmail;
