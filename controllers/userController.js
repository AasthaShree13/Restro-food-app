const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

//get user info
const getUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });

    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    //hide password
    user.password = undefined;
    res.status(200).send({
      sucess: true,
      message: "user data got sucessfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get user API",
      error,
    });
  }
};

//update user info
const updateUserController = async (req, res) => {
  try {
    //find useer
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    //update
    const { userName, address } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;

    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "user updated sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update user API",
      error,
    });
  }
};

//update password
const updatePasswordContrroller = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    //get  data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return req.status(500).send({
        success: false,
        message: "please provide old and new password",
      });
    }

    //check password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "wrong password",
      });
    }
    //hashing new password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    //update password
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "password updated sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in password update api",
      error,
    });
  }
};

//reset password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "please provide required details",
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "user not found or invalid answer",
      });
    }
    //hashnew password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "password reset successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in reset password API",
      error,
    });
  }
};

//delete user - delete
const deleteUserController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.body.id);
    return res.status(200).send({
      success: true,
      message: "profile deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete user API",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordContrroller,
  resetPasswordController,
  deleteUserController,
};
