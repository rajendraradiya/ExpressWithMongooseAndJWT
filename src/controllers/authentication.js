const logger = require("../plugin/logger");
const userModel = require("../model/users");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const newUsers = await userModel.find({});
    res.status(200).json({ data: newUsers });
  } catch (err) {
    logger.fatal(err);
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

const getSingUp = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const result = await userModel.create({
      username: username,
      password: password,
      email: email,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(201).json({
      data: result,
      token: token,
    });
  } catch (error) {
    logger.fatal(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};
const getSingIn = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does't not Existing" });
    }
    const matchPassword = password === existingUser.password;
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).json({
      data: existingUser,
      token: token,
    });
  } catch (error) {
    logger.fatal(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

module.exports = { getUsers, getSingUp, getSingIn };
