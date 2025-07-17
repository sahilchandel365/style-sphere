require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Appointment = require('../models/Appointment');
const Booking = require('../models/Booking');
const ArtistBooking =require('../models/Artist');
const BridalBooking = require('../models/BridalBooking');
const Order =require("../models/Orders")
const verifyPayment = async (req, res) => {
  const { paymentIntentId, appointmentData } = req.body;

  // ✅ Step 1: Validate input early
  if (!paymentIntentId || !appointmentData || !appointmentData.type) {
    return res.status(400).json({ success: false, error: 'Missing required data or booking type.' });
   
  }

  try {
    // ✅ Step 2: Verify Stripe payment
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      return res.status(402).json({ success: false, error: 'Payment was not completed.' });
    }

    // ✅ Step 3: Create the correct booking model
    const bookingType = appointmentData.type.toLowerCase().trim();
    let model;

    switch (bookingType) {
  case 'photoshoot':
    model = new Booking({
      ...appointmentData,
      paymentStatus: 'succeeded',
    });
    break;

  case 'onlineappointment':
    model = new Appointment({
      ...appointmentData,
      paymentStatus: 'succeeded',
    });
    break;

  case 'bridal':
    model = new BridalBooking({
      ...appointmentData,
      paymentStatus: 'succeeded',
    });
    break;

  case 'artist':
    model = new ArtistBooking({
      ...appointmentData,
      paymentStatus: 'succeeded',
    });
    break;

  case 'product':
    model = new Order({
      ...appointmentData,
      paymentIntentId,
      paymentStatus: 'succeeded',
      type: 'product',
    });
    break;

  default:
    return res.status(400).json({
      success: false,
      error: 'Invalid booking type provided.',
    });
}

await model.validate();
await model.save();
return res.status(200).json({
  success: true,
  message: `${bookingType} booking saved successfully!`,
});

  
  } catch (err) {
    console.error('❌ Error during booking verification:', err.message);

    // ✅ Prevent double responses
    if (res.headersSent) return;

    return res.status(500).json({
      success: false,
      error: err.message || 'Server error during booking.',
    });
  }
};

module.exports = { verifyPayment };
