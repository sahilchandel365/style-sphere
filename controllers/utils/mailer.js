const nodemailer = require('nodemailer');
require('dotenv').config();

const sendShippingEmail = async (email, orderId) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: 'Your Order Has Been Shipped!',
    text: `Dear Customer,\n\nYour order (ID: ${orderId}) has been successfully shipped. Thank you for shopping with us!\n\n- Style Sphere`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendShippingEmail };
