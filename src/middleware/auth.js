const logger = require("../plugin/logger");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
//   console.log(authorization);
  try {
    const token = authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(verifyToken);
    if (!verifyToken) {
      res.status(401).json({ message: "Unauthorization user" });
    }
    next();
  } catch (error) {
    logger.fatal(error);
    res.status(401).json({ message: "Unauthorization user" });
  }
};

module.exports = auth;
