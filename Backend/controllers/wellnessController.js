const WellnessTracker = require('../models/WellnessTracker');

// Add Wellness Entry
exports.addWellnessEntry = async (req, res) => {
  try {
    const { date, mood, overallWellness, mentalHealth, sleepHours, sleepQuality, stressLevel, exerciseMinutes, notes } = req.body;

    const wellnessEntry = await WellnessTracker.create({
      patient: req.userId,
      date: date || new Date(),
      mood,
      overallWellness,
      mentalHealth,
      sleepHours,
      sleepQuality,
      stressLevel,
      exerciseMinutes,
      notes
    });

    res.status(201).json({ success: true, message: 'Wellness entry added successfully', wellnessEntry });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Wellness Entries
exports.getWellnessEntries = async (req, res) => {
  try {
    const { startDate, endDate, limit = 30 } = req.query;
    
    let query = { patient: req.userId };
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const entries = await WellnessTracker.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));

    res.json({ success: true, count: entries.length, entries });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Wellness Statistics
exports.getWellnessStats = async (req, res) => {
  try {
    const entries = await WellnessTracker.find({ patient: req.userId })
      .sort({ date: -1 })
      .limit(30);

    if (entries.length === 0) {
      return res.json({
        success: true,
        stats: {
          overallWellness: 0,
          mentalHealth: 0,
          sleepQuality: 0,
          stressLevel: 0,
          totalEntries: 0
        }
      });
    }

    const latest = entries[0];
    const previous = entries.length > 1 ? entries[1] : null;

    const stats = {
      overallWellness: latest.overallWellness,
      mentalHealth: latest.mentalHealth || latest.overallWellness,
      sleepQuality: latest.sleepQuality || 0,
      stressLevel: latest.stressLevel || 0,
      totalEntries: entries.length,
      change: previous ? {
        overallWellness: (latest.overallWellness - previous.overallWellness).toFixed(1),
        mentalHealth: previous.mentalHealth ? (latest.mentalHealth - previous.mentalHealth).toFixed(1) : 0
      } : null
    };

    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

