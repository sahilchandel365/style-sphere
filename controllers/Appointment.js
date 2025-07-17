require('dotenv').config(); // Ensure this is at the top of your server file

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Appointment = require('../models/Appointment');
const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid or missing payment amount.' });
  }

  try {
    // You may want to confirm the currency here or calculate conversion rates if necessary
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount should be in the smallest currency unit (e.g., paise for INR, cents for USD)
      currency: 'inr',
      automatic_payment_methods: { enabled: true },
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('[Stripe Payment Error]', error);
    return res.status(500).json({
      error: error.message || 'Payment creation failed. Please try again.',
    });
  }
};module.exports = { createPaymentIntent };