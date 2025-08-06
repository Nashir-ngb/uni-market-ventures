// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CORS so frontend can call this backend
const corsOptions = {
  origin: 'https://unimarket-ventures.netlify.app', // your real frontend URL
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Existing routes
const sellerRoutes = require('./routes/seller');  // seller login & AI chat route
const authRoutes = require('./routes/auth');      // buyer login
const userRoutes = require('./routes/user');      // buyer register, dashboard, etc.
app.use('/api/seller', sellerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// ✅ Simple health check route
app.get('/', (req, res) => {
  res.send('✅ UniMarket backend is running!');
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/unimarket')
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
