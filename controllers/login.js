const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require('../models/User');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    const errorMsg = "Authentication failed: email or password is incorrect";

    if (!user) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET, // Make sure this matches your .env
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      email,
      name: user.name,
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  login,
};
