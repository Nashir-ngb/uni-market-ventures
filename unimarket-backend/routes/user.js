// unimarket-backend/routes/user.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Order = require('../models/Order');
const Notification = require('../models/Notification');
const Product = require('../models/Product'); // products
const Appointment = require('../models/Appointment'); // appointments
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // local uploads folder

// Dummy in-memory cart per user (for demo)
const userCarts = {};

// ✅ Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, 'secretkey'); // replace with process.env.JWT_SECRET
    req.userId = decoded.userId;
    next();
  } catch {
    res.sendStatus(401);
  }
};

// ✅ Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Dashboard (profile)
router.get('/dashboard', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
});

// ✅ Step 1: Products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load products' });
  }
});

// ✅ Step 2: Appointments
router.post('/appointments', authMiddleware, async (req, res) => {
  try {
    const { business, date } = req.body;
    const appointment = new Appointment({ userId: req.userId, business, date });
    await appointment.save();
    res.json({ message: 'Appointment booked', appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to book appointment' });
  }
});

router.get('/appointments', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.userId }).sort({ date: -1 });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load appointments' });
  }
});

router.delete('/appointments/:id', authMiddleware, async (req, res) => {
  try {
    await Appointment.deleteOne({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Appointment cancelled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to cancel appointment' });
  }
});

router.put('/appointments/:id', authMiddleware, async (req, res) => {
  try {
    const { date, status } = req.body;
    const updated = await Appointment.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { date, status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update appointment' });
  }
});

// ✅ Step 3: Cart & checkout
router.post('/cart', authMiddleware, (req, res) => {
  const { productId, name, price, quantity } = req.body;
  if (!userCarts[req.userId]) userCarts[req.userId] = [];
  userCarts[req.userId].push({ productId, name, price, quantity });
  res.json({ message: 'Added to cart' });
});

router.get('/cart', authMiddleware, (req, res) => {
  res.json(userCarts[req.userId] || []);
});

router.delete('/cart/:index', authMiddleware, (req, res) => {
  const index = parseInt(req.params.index);
  if (!userCarts[req.userId]) return res.status(400).json({ message: 'Cart empty' });
  userCarts[req.userId].splice(index, 1);
  res.json({ message: 'Removed from cart' });
});

router.post('/checkout', authMiddleware, async (req, res) => {
  const cart = userCarts[req.userId];
  if (!cart || cart.length === 0) return res.status(400).json({ message: 'Cart is empty' });
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = new Order({ userId: req.userId, items: cart, total, status: 'Pending' });
  await order.save();
  userCarts[req.userId] = [];
  res.json({ message: 'Order placed successfully', order });
});

router.get('/orders', authMiddleware, async (req, res) => {
  const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(orders);
});

// ✅ Step 4: Dashboard stats
router.get('/dashboard/stats', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    const upcomingAppointments = await Appointment.find({ userId: req.userId, date: { $gte: new Date() } });
    res.json({
      totalOrders: orders.length,
      totalSpent: orders.reduce((sum, o) => sum + o.total, 0),
      upcomingAppointments: upcomingAppointments.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load stats' });
  }
});

// ✅ Step 5: Notifications
router.get('/notifications', authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.userId }).sort({ date: -1 });
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load notifications' });
  }
});

// 🔧 Profile & account settings
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { username } = req.body;
    await User.findByIdAndUpdate(req.userId, { username });
    res.json({ message: 'Profile updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: 'Password is required' });
    const hashed = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(req.userId, { password: hashed });
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to change password' });
  }
});

router.post('/change-email', authMiddleware, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });
    await User.findByIdAndUpdate(req.userId, { email });
    res.json({ message: 'Email updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to change email' });
  }
});

router.post('/change-phone', authMiddleware, async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'Phone number is required' });
    await User.findByIdAndUpdate(req.userId, { phone });
    res.json({ message: 'Phone number updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to change phone number' });
  }
});

// 📦 Seller add product
router.post('/seller/products', authMiddleware, async (req, res) => {
  const { name, price } = req.body;
  try {
    const product = new Product({ name, price, sellerId: req.userId });
    await product.save();
    res.json({ message: 'Product added', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add product' });
  }
});

// 📊 Seller stats
router.get('/seller/stats', authMiddleware, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ sellerId: req.userId });
    const totalOrders = await Order.countDocuments({ 'items.sellerId': req.userId });
    res.json({ totalProducts, totalOrders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load seller stats' });
  }
});

// 🧾 Dummy seller products & orders
router.get('/seller/products', authMiddleware, async (req, res) => {
  res.json([
    { name: 'AIU T-shirt', price: 25 },
    { name: 'Coffee Mug', price: 10 }
  ]);
});

router.get('/seller/orders', authMiddleware, async (req, res) => {
  res.json([
    { _id: '001', total: 35, status: 'Pending' },
    { _id: '002', total: 50, status: 'Delivered' }
  ]);
});
// GET /api/user/seller/stats
router.get('/seller/stats', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ ownerId: req.userId });
    const orders = await Order.find({ 'items.ownerId': req.userId }); // adapt logic if you store ownerId
    res.json({ totalProducts: products.length, totalOrders: orders.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load seller stats' });
  }
});
// Edit product
router.put('/products/:id', authMiddleware, async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.userId }, // only owner's product
      { name, price, description, imageUrl },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found or not yours' });
    res.json({ message: 'Product updated', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// Delete product
router.delete('/products/:id', authMiddleware, async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id, ownerId: req.userId });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Product not found or not yours' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});
router.get('/seller/products', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ ownerId: req.userId });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load seller products' });
  }
});
// 📦 Upload product image
router.post('/products/upload', authMiddleware, upload.single('image'), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});
// View seller's own products
router.get('/seller/my-products', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ ownerId: req.userId });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load seller products' });
  }
});

// Edit product
router.put('/products/:id', authMiddleware, async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.userId },
      { name, price, description },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// Delete product
router.delete('/products/:id', authMiddleware, async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id, ownerId: req.userId });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

// View orders containing seller's products (simplified)
router.get('/seller/my-orders', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ ownerId: req.userId });
    const productIds = products.map(p => p._id.toString());

    const orders = await Order.find({ "items.productId": { $in: productIds } });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load seller orders' });
  }
});
// POST /api/user/products/add
router.post('/products/add', authMiddleware, upload.single('image'), async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const product = new Product({
      name,
      price,
      description,
      imageUrl: req.file.filename,  // save filename
      ownerId: req.userId
    });
    await product.save();
    res.json({ message: '✅ Product added successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Failed to add product' });
  }
});
// 📊 Seller stats route
router.get('/seller/stats', authMiddleware, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ ownerId: req.userId });
    const totalOrders = await Order.countDocuments({ userId: req.userId }); 
    res.json({ totalProducts, totalOrders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load seller stats' });
  }
});

module.exports = router;
