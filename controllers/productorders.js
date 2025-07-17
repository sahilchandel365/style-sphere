// controllers/productorders.js

const Product = require('../models/products');
const Order = require('../models/Orders');
const nodemailer = require('nodemailer');

// GET /auth/product-orders
// Fetch all product orders
const getProductOrders = async (req, res) => {
  try {
    const orders = await Order.find({ type: 'product' }).populate('user');
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// POST /auth/update-quantity
// Deduct `quantity` from the specified product's stock
const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || typeof quantity !== 'number') {
    return res
      .status(400)
      .json({ success: false, message: 'Missing productId or quantity.' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found.' });
    }

    product.quantity = Math.max(product.quantity - quantity, 0);
    await product.save();

    res
      .status(200)
      .json({ success: true, message: 'Product quantity updated.' });
  } catch (err) {
    console.error('Error updating quantity:', err);
    res
      .status(500)
      .json({ success: false, message: 'Failed to update product quantity.' });
  }
};

// POST /auth/send-shipping-email
// Mark order shipped, send email, and deduct stock for each item
const shipOrder = async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing order ID.' });
  }

  try {
    const order = await Order.findById(orderId).populate('user');
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found.' });
    }

    const email = order.user?.email;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: 'Customer email not available.' });
    }

    // 1) Send shipping email
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
      text: `Dear ${order.user?.name || 'Customer'},\n\nYour order (ID: ${orderId}) has been successfully shipped.\n\nThank you for shopping with Style Sphere!`,
    };

    await transporter.sendMail(mailOptions);

    // 2) Update order status to “shipped”
    order.paymentStatus = 'shipped';
    await order.save();

    // 3) Deduct stock for each item in the order
    const items = order.items || [];
    for (const item of items) {
      const { productId, quantity } = item;
      if (!productId) {
        console.warn('Skipping stock update: productId undefined for item', item);
        continue;
      }

      const product = await Product.findById(productId);
      if (!product) {
        console.warn(`Skipping stock update: product not found for ID ${productId}`);
        continue;
      }

      product.quantity = Math.max(product.quantity - quantity, 0);
      await product.save();
    }

    res
      .status(200)
      .json({ success: true, message: 'Email sent, order shipped, stock updated.' });
  } catch (err) {
    console.error('Shipping Error:', err);
    res
      .status(500)
      .json({ success: false, message: 'Shipping failed.' });
  }
};

module.exports = {
  getProductOrders,
  updateQuantity,
  shipOrder,
};
