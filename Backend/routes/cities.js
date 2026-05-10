const express = require('express');
const { Op } = require('sequelize');
const { City, Activity } = require('../models');

const router = express.Router();

// @route   GET /api/cities
// @desc    Get all cities with filtering and sorting
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, country, region } = req.query;
    
    // Build where clause
    const where = {};
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }
    if (country) {
      where.country = country;
    }
    if (region) {
      where.region = region;
    }

    const cities = await City.findAll({
      where,
      order: [['popularity_score', 'DESC']]
    });

    res.json(cities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/cities/:id
// @desc    Get single city with its activities
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const city = await City.findByPk(req.params.id, {
      include: [{ model: Activity }]
    });

    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.json(city);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
