const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { createOrder, getAllOrders, getOrderById } = require('../controllers/orderController');

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

router.route('/:id')
  .get(protect, getOrderById);

module.exports = router;
