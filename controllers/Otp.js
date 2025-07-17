const bcrypt = require('bcryptjs'); // Make sure bcrypt is imported
const { sendOtpEmail } = require('../controllers/Mailer');

// In-memory user store (replace with DB in real apps)
const users = {
  // Example:
  // 'user@example.com': { password: 'hashedpassword', ... }
};

// In-memory OTP store
const otpStore = {};

/**
 * 1. Request OTP
 */
const requestotp = async (req, res) => {
  const { email } = req.body;

  if (!users[email]) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP with 5 minutes expiry
  otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

  console.log(`OTP for ${email}: ${otp}`); // For testing, remove in production

  try {
    await sendOtpEmail(email, otp);
    res.json({ success: true, message: 'OTP sent to email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error sending OTP' });
  }
};

/**
 * 2. Verify OTP
 */
const verifyotp = async (req, res) => {
  const { email, otp } = req.body;

  const stored = otpStore[email];

  if (!stored || stored.otp !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  if (Date.now() > stored.expires) {
    delete otpStore[email]; // Clear expired OTP
    return res.status(400).json({ success: false, message: 'OTP expired' });
  }

  res.json({ success: true, message: 'OTP verified' });
};

/**
 * 3. Reset Password
 */
const resetpassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const stored = otpStore[email];

  if (!stored || stored.otp !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  if (Date.now() > stored.expires) {
    delete otpStore[email];
    return res.status(400).json({ success: false, message: 'OTP expired' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    users[email].password = await bcrypt.hash(newPassword, salt);

    delete otpStore[email]; // Clear OTP after successful reset

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error resetting password' });
  }
};

module.exports = {
  requestotp,
  verifyotp,
  resetpassword,
};
