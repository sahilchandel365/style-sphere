const bcrypt = require("bcrypt");
const userModel = require('../models/User');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    console.log("Request body:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields (name, email, password) are required",
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, you can log in",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
    console.error("Signup error:", err);
  }
};

module.exports = {
  signup,
};
