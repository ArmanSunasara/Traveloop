const express = require('express');
const { Trip, Stop, City, Activity, Budget, ChecklistItem, Note, Sequelize } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/trips/:id/public
// @desc    Get public trip details
// @access  Public
router.get('/:id/public', async (req, res) => {
  try {
    const trip = await Trip.findOne({
      where: { id: req.params.id, is_public: true },
      include: [
        {
          model: Stop,
          include: [
            { model: City },
            { model: Activity }
          ]
        }
      ]
    });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found or not public' });
    }

    res.json(trip);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// All routes below require authentication
router.use(authMiddleware);

// @route   GET /api/trips
// @desc    Get all user trips with stop count
// @access  Private
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.findAll({
      where: { user_id: req.user.id },
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "stops" AS "Stop"
              WHERE "Stop"."trip_id" = "Trip"."id"
            )`),
            'stopCount'
          ]
        ]
      }
    });
    res.json(trips);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/trips
// @desc    Create a trip
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { name, description, start_date, end_date, cover_photo, is_public } = req.body;
    
    const newTrip = await Trip.create({
      user_id: req.user.id,
      name,
      description,
      start_date,
      end_date,
      cover_photo,
      is_public: is_public || false
    });

    res.json(newTrip);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/trips/:id
// @desc    Get full trip details
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Stop,
          include: [
            { model: City },
            { model: Activity }
          ]
        }
      ],
      order: [
        [Stop, 'order_index', 'ASC']
      ]
    });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Verify owner
    if (trip.user_id !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(trip);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/trips/:id
// @desc    Update a trip
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    let trip = await Trip.findByPk(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.user_id !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { name, description, start_date, end_date, cover_photo, is_public } = req.body;

    trip = await trip.update({
      name: name !== undefined ? name : trip.name,
      description: description !== undefined ? description : trip.description,
      start_date: start_date !== undefined ? start_date : trip.start_date,
      end_date: end_date !== undefined ? end_date : trip.end_date,
      cover_photo: cover_photo !== undefined ? cover_photo : trip.cover_photo,
      is_public: is_public !== undefined ? is_public : trip.is_public
    });

    res.json(trip);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/trips/:id
// @desc    Delete a trip
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.user_id !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Cascade delete manually since we didn't set onDelete CASCADE in DB
    await Stop.destroy({ where: { trip_id: trip.id } });
    await ChecklistItem.destroy({ where: { trip_id: trip.id } });
    await Note.destroy({ where: { trip_id: trip.id } });
    await Budget.destroy({ where: { trip_id: trip.id } });

    await trip.destroy();

    res.json({ message: 'Trip removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/trips/:id/stops
// @desc    Get all stops for a trip
// @access  Private
router.get('/:id/stops', async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.user_id !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    const stops = await Stop.findAll({
      where: { trip_id: req.params.id },
      include: [
        { model: City },
        { model: Activity }
      ],
      order: [['order_index', 'ASC']]
    });

    res.json(stops);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/trips/:id/stops
// @desc    Add a stop to a trip
// @access  Private
router.post('/:id/stops', async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.user_id !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    const { city_id, start_date, end_date, order_index } = req.body;

    const newStop = await Stop.create({
      trip_id: trip.id,
      city_id,
      start_date,
      end_date,
      order_index
    });

    res.json(newStop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
