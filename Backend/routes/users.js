const express = require('express');
const { User, Trip, Stop, ChecklistItem, Note, Budget } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/users/me
// @desc    Update current user profile
// @access  Private
router.put('/me', async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, photo, language } = req.body;

    await user.update({
      name: name !== undefined ? name : user.name,
      photo: photo !== undefined ? photo : user.photo,
      language: language !== undefined ? language : user.language
    });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/users/me
// @desc    Delete account and cascade delete all associated data
// @access  Private
router.delete('/me', async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all trips for the user to delete associated child records
    const trips = await Trip.findAll({ where: { user_id: user.id } });
    const tripIds = trips.map(t => t.id);

    if (tripIds.length > 0) {
      await Stop.destroy({ where: { trip_id: tripIds } });
      await ChecklistItem.destroy({ where: { trip_id: tripIds } });
      await Note.destroy({ where: { trip_id: tripIds } });
      await Budget.destroy({ where: { trip_id: tripIds } });
      await Trip.destroy({ where: { user_id: user.id } });
    }

    // Delete user
    await user.destroy();

    res.json({ message: 'User account and all associated data deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
