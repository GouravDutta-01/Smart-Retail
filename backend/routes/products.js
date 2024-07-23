const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

router.route('/')
  .get(getAllProducts)
  .post(protect, admin, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
