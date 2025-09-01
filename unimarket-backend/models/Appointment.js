// unimarket-backend/models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  business: String, // which business or counselor
  date: Date,
  status: { type: String, default: 'Scheduled' } // or 'Completed', 'Cancelled'
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
