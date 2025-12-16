const mongoose = require('mongoose');

const wellnessTrackerSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  mood: {
    type: String,
    enum: ['Happy', 'Calm', 'Neutral', 'Anxious', 'Sad', 'Stressed'],
    required: true
  },
  overallWellness: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },
  mentalHealth: {
    type: Number,
    min: 0,
    max: 10
  },
  sleepHours: {
    type: Number,
    min: 0,
    max: 24
  },
  sleepQuality: {
    type: Number,
    min: 0,
    max: 10
  },
  stressLevel: {
    type: Number,
    min: 0,
    max: 10
  },
  exerciseMinutes: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
wellnessTrackerSchema.index({ patient: 1, date: -1 });

module.exports = mongoose.model('WellnessTracker', wellnessTrackerSchema);

