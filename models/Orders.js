const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['product', 'service'],
    required: true,
  },

  // Common fields
  paymentIntentId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    default: 'pending',
    enum: ['pending', 'succeeded', 'failed'],
  },
  paymentStatus: {
  type: String,
  enum: ['pending', 'succeeded', 'failed', 'shipped'], // <-- Add 'shipped' here
  default: 'pending',
},


  createdAt: {
    type: Date,
    default: Date.now,
  },

  // For product orders
  user: {
    name: String,
    address: String,
    contact: String,
    email: String,         // added email here
  },

  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      total: Number,
    },
  ],

  totalAmount: {
    type: Number,
    default: 0,
  },

  // For salon/service appointments
  appointment: {
    name: String,
    phone: String,
    email: String,          // added email here
    service: String,
    date: String,
    time: String,
    quantity: Number,
    price: Number,
    address: String,
  },
});

module.exports = mongoose.model('Order', orderSchema);
