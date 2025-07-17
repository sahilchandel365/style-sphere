const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // storing time as a string (HH:mm)
    required: true,
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
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['photoshoot', 'onlineappointment', 'bridal'], // You can add more types here
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
