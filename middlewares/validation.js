const joi = require('joi');

// Signup validation middleware
const signupValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).max(30).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    // Return specific error details in the response
    return res.status(400).json({
      message: "Bad request",
      error: error.details.map((detail) => detail.message), // Just the error messages for better readability
    });
  }

  next();
};

// Login validation middleware
const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(30).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    // Return specific error details in the response
    return res.status(400).json({
      message: "Bad request",
      error: error.details.map((detail) => detail.message), // Just the error messages for better readability
    });
  }

  next();
};

module.exports = { signupValidation, loginValidation };
