// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
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
const sellerRoutes = require('./routes/seller');  // seller login & functions
const sellerRoutes = require('./routes/seller');  // seller login & AI chat route
const authRoutes = require('./routes/auth');      // buyer login
const userRoutes = require('./routes/user');      // buyer register, dashboard, etc.
app.use('/api/seller', sellerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// ✅ Simple health route
// ✅ Simple health check route
app.get('/', (req, res) => {
  res.send('✅ UniMarket backend is running!');
});

// ✅ NEW: AI chat route
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a friendly assistant for UniMarket, which lists businesses inside the university and helps students book counsellor appointments." },
        { role: "user", content: userMessage }
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

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/unimarket', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/unimarket')
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
