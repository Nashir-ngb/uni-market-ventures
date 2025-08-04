const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');

// ✅ Seller register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Registering seller with:', { username, email }); // debug log

  try {
    let seller = await Seller.findOne({ email });
    if (seller) {
      return res.status(400).json({ message: 'Seller already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed'); // debug log

    seller = new Seller({
      username,
      email,
      password: hashedPassword
    });

    await seller.save();
    console.log('Seller saved to DB'); // debug log

    const token = jwt.sign(
      { id: seller._id, role: 'seller' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    console.log('JWT created'); // debug log

    res.json({
      message: 'Seller registered successfully!',
      token,
      role: 'seller',
      username: seller.username
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Seller login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Seller login attempt:', email); // debug log
  try {
    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: seller._id, role: 'seller' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      role: 'seller',
      username: seller.username
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Seller register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let seller = await Seller.findOne({ email });
    if (seller) {
      return res.status(400).json({ message: 'Seller already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    seller = new Seller({
      username,
      email,
      password: hashedPassword
    });

    await seller.save();

    const token = jwt.sign(
      { id: seller._id, role: 'seller' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Seller registered successfully!',
      token,
      role: 'seller',
      username: seller.username
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
