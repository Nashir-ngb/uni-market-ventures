const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Order = require('../models/Order');
const Notification = require('../models/Notification');
const Product = require('../models/Product');
const Appointment = require('../models/Appointment');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const userCarts = {};

// ✅ Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.userId = decoded.userId;
    next();
  } catch {
    res.sendStatus(401);
  }
};

// ✅ Register
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Username, email and password are required' });
    }

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed, email });
    await user.save();

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: 'buyer' },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );

    res.json({ token, role: 'buyer', username: user.username });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Dashboard info
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Failed to load dashboard' });
  }
});

// ✅ Products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Products error:', err);
    res.status(500).json({ message: 'Failed to load products' });
  }
});

// 📊 Buyer dashboard stats
router.get('/dashboard/stats', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    const upcomingAppointments = await Appointment.find({
      userId: req.userId,
      date: { $gte: new Date() }
    });
    res.json({
      totalOrders: orders.length,
      totalSpent: orders.reduce((sum, o) => sum + o.total, 0),
      upcomingAppointments: upcomingAppointments.length
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ message: 'Failed to load stats' });
  }
});

module.exports = router;
