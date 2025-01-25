const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) res.status(400).send("User not found.");

  const validPwd = await bcrypt.compare(password, user.password);
  if (!validPwd) res.status(400).send("Invalid password.");

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
  );
  res.send(token);
});

module.exports = router;
