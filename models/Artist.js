const mongoose = require('mongoose');

const ArtistBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  artist: {
    type: String,
    required: [true, 'Artist name is required'],
  },
  specialty: {
    type: String,
    required: [true, 'Specialty is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
   paymentStatus: {
    type: String,
      default: 'pending',
    enum: ['pending', 'succeeded', 'failed'],
    
  },
  type: {
    type: String,
    default: 'artist',
    enum: ['artist', 'bridal', 'salon'],
  },
  service: {
    type: String,
    default: 'artist-booking',
  },
}, { timestamps: true });

module.exports = mongoose.model('ArtistBooking', ArtistBookingSchema);
