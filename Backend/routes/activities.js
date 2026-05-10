const express = require('express');
const { Op } = require('sequelize');
const { Activity } = require('../models');

const router = express.Router();

// @route   GET /api/activities
// @desc    Get activities with filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { city_id, type, maxCost, duration } = req.query;
    
    // Build where clause
    const where = {};
    if (city_id) {
      where.city_id = city_id;
    }
    if (type) {
      where.type = type;
    }
    if (maxCost) {
      where.cost = { [Op.lte]: maxCost };
    }
    if (duration) {
      // Assuming duration query means maximum duration
      where.duration = { [Op.lte]: duration };
    }

    const activities = await Activity.findAll({ where });

    res.json(activities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
