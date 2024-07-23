const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const dotenv = require('dotenv');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const createAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error('Admin email and password must be set in .env');
      process.exit(1);
    }

    let user = await User.findOne({ email: adminEmail });
    if (user) {
      console.log('Admin already exists');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    user = new User({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });

    await user.save();
    console.log('Admin created');
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

createAdmin();
