const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const facilitySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  sportType: {
    type: String,
    enum: ['badminton', 'futsal', 'table-tennis', 'squash', 'gym', 'basketball'],
    required: true,
  },
  location: {
    type: String,
    trim: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  images: [String],
  slots: [slotSchema],
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Facility', facilitySchema);
