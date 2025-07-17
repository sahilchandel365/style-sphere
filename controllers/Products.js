// controller/productController.js
const Product = require('../models/products');
const path = require('path');

// Image upload handler (Multer)
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const products = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const image = req.file ? req.file.filename : null;

    const product = new Product({ name, price, quantity, image });
    const saved = await product.save();

    res.status(201).json({
      message: "Product created successfully",
      success: true,
      product: saved
    });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { products, upload };
