 const Product = require('../models/products');
 const getproducts= async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
}
module.exports={getproducts}
