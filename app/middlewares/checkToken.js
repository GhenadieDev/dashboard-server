import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "You are not authorized" });
    }

    req.decoded = decoded;
    next();
  });
};

export default checkToken;
