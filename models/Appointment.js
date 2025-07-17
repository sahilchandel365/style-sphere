const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Basic 10-digit phone validation
  },
  service: {
    type: String,
    required: true,
  },
   paymentStatus: {
    type: String,
      default: 'pending',
    enum: ['pending', 'succeeded', 'failed'],
    
  },
  date: {
    type: String, // Stored as 'YYYY-MM-DD'
    required: true,
  },
  time: {
    type: String, // Stored as 'HH:mm'
    required: true,
    match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, // Valid 24hr format
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  address: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
