const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: {
    type: Number,
    default: 0,
  },
  image: {
    type: String, // Stores the image URL or relative file path
    required: false,
  },
  // Add other fields if needed (like description, category, etc.)
});

module.exports = mongoose.model('Product', productSchema);
