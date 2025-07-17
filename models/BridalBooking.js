const mongoose = require('mongoose');

const BridalBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10,15}$/, // Basic phone validation
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
   paymentStatus: {
    type: String,
      default: 'pending',
    enum: ['pending', 'succeeded', 'failed'],
    
  },
  address: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'bridal',
    enum: ['bridal'], // Lock to bridal to avoid misuse
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BridalBooking', BridalBookingSchema);
