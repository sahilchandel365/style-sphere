const bcrypt = require('bcryptjs');

const users = {
  'test@example.com': {
    email: 'test@example.com',
    password: bcrypt.hashSync('password123', 10),
  },
};

const otpStore = {}; // { email: { otp, expires } }

module.exports = { users, otpStore };
