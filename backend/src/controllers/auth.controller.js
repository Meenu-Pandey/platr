const userModel = require("../model/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    return res.status(201).json({
      message: "User register successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    return res.status(500).json({
        message : "Internal server error",
        error : error.message
    })
  }
};

module.exports = {
  registerUser,
};
