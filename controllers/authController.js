const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

//register
const registerController = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      phone,
      address,
      answer,
      profile,
      userType,
    } = req.body;
    //validation
    if (!userName || !email || !password || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "please provide required fields",
      });
    }

    //check existing user
    const existing = await userModel.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "email or phone no already registered",
      });
    }

    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
      userType,
      profile,
    });
    res.status(200).send({
      success: true,
      message: "new user registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in register api",
      error,
    });
  }
};

//login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "please enter email and password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "invalid email",
      });
    }
    //check user password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid password",
      });
    }

    //token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login sucessfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
