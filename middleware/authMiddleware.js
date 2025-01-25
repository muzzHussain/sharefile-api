const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let decoded;
  const token = req.headers["authorization"];
  console.log("token -> ", token);
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    console.log("inside try block");
    const bearerToken = token.split(" ")[1];
    if (!bearerToken) return res.status(400).send("Invalid token format");
    decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

module.exports = auth;
