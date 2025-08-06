const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);
