const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',       // Replace with your Gmail
    pass: 'your-app-password',          // Use App Password, not account password
  },
});

async function sendOtpEmail(to, otp) {
  const mailOptions = {
    from: '"Your App" <your-email@gmail.com>',
    to,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}. It expires in 5 minutes.`,
    
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendOtpEmail };
