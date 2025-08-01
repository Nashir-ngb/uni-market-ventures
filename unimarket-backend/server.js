const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const sellerRoutes = require('./routes/seller');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use('/api/seller', sellerRoutes);  // seller login
app.use('/api/auth', authRoutes);      // buyer login
app.use('/api/user', userRoutes);      // buyer registration & dashboard

// Test route
app.get('/', (req, res) => {
  res.send('✅ Backend is working!');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/unimarket', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
