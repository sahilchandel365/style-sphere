const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Adjust path as needed

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();

    // Format response to match frontend's column keys
    const formatted = orders.map(order => ({
      _id: order._id,
      userEmail: order?.user?.name || 'N/A',  // or get email if available
      total: order.totalAmount || order?.appointment?.price || 0,
      status: order.paymentStatus,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
