const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

console.log('Using OpenAI key starts with:', process.env.OPENAI_API_KEY?.slice(0, 8));

// ✅ AI chat route
router.post('/ask', async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a friendly assistant for UniMarket, which lists businesses inside the university and helps students book counsellor appointments." },
        { role: "user", content: message }
      ],
      temperature: 0.5
    });
    const aiReply = completion.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (error) {
    console.error('❌ OpenAI error:', error);
    res.status(500).json({ reply: "Oops! Something went wrong." });
  }
});

// ✅ Seller register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let seller = await Seller.findOne({ email });
    if (seller) {
      return res.status(400).json({ message: 'Seller already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    seller = new Seller({ username, email, password: hashedPassword });
    await seller.save();
    const token = jwt.sign({ id: seller._id, role: 'seller' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Seller registered successfully!', token, role: 'seller', username: seller.username });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Seller login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: seller._id, role: 'seller' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, role: 'seller', username: seller.username });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
