const express = require('express');
const router = express.Router();
const {
  addWellnessEntry,
  getWellnessEntries,
  getWellnessStats
} = require('../controllers/wellnessController');
const { protect } = require('../middleware/auth');

router.use(protect); // All routes require authentication

router.post('/', addWellnessEntry);
router.get('/', getWellnessEntries);
router.get('/stats', getWellnessStats);

module.exports = router;

