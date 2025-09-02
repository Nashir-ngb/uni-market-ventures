const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['seller'],
      default: 'seller',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Seller', sellerSchema);
