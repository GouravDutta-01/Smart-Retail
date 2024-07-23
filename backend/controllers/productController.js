const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, countInStock } = req.body;

  try {
    const product = new Product({ name, description, price, countInStock });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, countInStock } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;

    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    await product.remove();
    res.json({ msg: 'Product removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
