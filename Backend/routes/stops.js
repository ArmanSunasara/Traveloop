const express = require('express');
const { Stop, Trip, Activity, StopActivity } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Middleware to check if user owns the trip associated with the stop
const checkStopOwnership = async (req, res, next) => {
  try {
    const stopId = req.params.id;
    const stop = await Stop.findByPk(stopId, {
      include: [{ model: Trip }]
    });

    if (!stop) {
      return res.status(404).json({ message: 'Stop not found' });
    }

    if (stop.Trip.user_id !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.stop = stop;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/stops/:id
// @desc    Update stop dates or order_index
// @access  Private
router.put('/:id', checkStopOwnership, async (req, res) => {
  try {
    const { start_date, end_date, order_index } = req.body;
    const stop = req.stop;

    await stop.update({
      start_date: start_date !== undefined ? start_date : stop.start_date,
      end_date: end_date !== undefined ? end_date : stop.end_date,
      order_index: order_index !== undefined ? order_index : stop.order_index
    });

    res.json(stop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/stops/:id
// @desc    Remove stop and its activity assignments
// @access  Private
router.delete('/:id', checkStopOwnership, async (req, res) => {
  try {
    const stop = req.stop;
    
    // Remove activity assignments first
    await StopActivity.destroy({ where: { stop_id: stop.id } });
    
    // Delete stop
    await stop.destroy();

    res.json({ message: 'Stop removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/stops/:id/activities
// @desc    Add activity to stop
// @access  Private
router.post('/:id/activities', checkStopOwnership, async (req, res) => {
  try {
    const { activity_id } = req.body;
    const stop = req.stop;

    // Check if activity exists
    const activity = await Activity.findByPk(activity_id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Check if already assigned
    const existingAssignment = await StopActivity.findOne({
      where: { stop_id: stop.id, activity_id }
    });

    if (existingAssignment) {
      return res.status(400).json({ message: 'Activity already added to this stop' });
    }

    const newStopActivity = await StopActivity.create({
      stop_id: stop.id,
      activity_id
    });

    res.json(newStopActivity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/stops/:id/activities/:activityId
// @desc    Remove activity from stop
// @access  Private
router.delete('/:id/activities/:activityId', checkStopOwnership, async (req, res) => {
  try {
    const { activityId } = req.params;
    const stop = req.stop;

    const deleted = await StopActivity.destroy({
      where: { stop_id: stop.id, activity_id: activityId }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Activity assignment not found' });
    }

    res.json({ message: 'Activity removed from stop' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
