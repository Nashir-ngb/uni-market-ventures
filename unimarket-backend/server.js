// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors());
const corsOptions = {
  origin: 'https://unimarket-ventures.netlify.app',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Routes
const sellerRoutes = require('./routes/seller');  // seller login & seller functions
const authRoutes = require('./routes/auth');      // buyer login
const userRoutes = require('./routes/user');      // buyer register, dashboard, etc.
const registerRoutes = require('./routes/register');
app.use('/api', registerRoutes);  // now handles both /api/auth/register and /api/seller/register

app.use('/api/seller', sellerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// ✅ Simple test route
app.get('/', (req, res) => {
  res.send('✅ UniMarket backend is running!');
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/unimarket', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));