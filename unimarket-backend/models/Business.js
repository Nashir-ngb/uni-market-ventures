// unimarket-backend/models/Business.js
const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g. Coffee, Tailoring
  description: { type: String },
  location: { type: String },
  rating: { type: Number, default: 0 },
  image: { type: String }, // store image URL
  products: [
    {
      name: String,
      price: Number,
      image: String,
      description: String,
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Business', businessSchema);
