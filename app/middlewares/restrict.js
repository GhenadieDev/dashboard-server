const restrict = async (req, res, next) => {
  const { role } = req.decoded;
  if (role === "admin") {
    next();
  } else {
    return res
      .status(401)
      .json({ message: "You are not allowed to access this page" });
  }
};

export default restrict;
