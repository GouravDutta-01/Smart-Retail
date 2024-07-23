const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  try {
    const order = new Order({
      user: req.user.id,
      orderItems,
      totalPrice
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
