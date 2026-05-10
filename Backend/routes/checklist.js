const express = require('express');
const { Trip, ChecklistItem } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Middleware to check trip ownership
const checkTripOwnership = async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.user_id !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    req.trip = trip;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Middleware to check checklist item ownership via its trip
const checkChecklistOwnership = async (req, res, next) => {
  try {
    const item = await ChecklistItem.findByPk(req.params.itemId, {
      include: [{ model: Trip }]
    });
    if (!item) return res.status(404).json({ message: 'Checklist item not found' });
    if (item.Trip.user_id !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    req.checklistItem = item;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/checklist/trips/:id
// @desc    Get all checklist items for a trip grouped by category
// @access  Private
router.get('/trips/:id', checkTripOwnership, async (req, res) => {
  try {
    const items = await ChecklistItem.findAll({
      where: { trip_id: req.params.id }
    });

    // Group items by category
    const grouped = items.reduce((acc, item) => {
      const category = item.category || 'other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});

    res.json(grouped);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/checklist/trips/:id
// @desc    Create checklist item
// @access  Private
router.post('/trips/:id', checkTripOwnership, async (req, res) => {
  try {
    const { label, category } = req.body;

    const newItem = await ChecklistItem.create({
      trip_id: req.params.id,
      label,
      category: category || 'other',
      is_packed: false
    });

    res.json(newItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/checklist/:itemId
// @desc    Update checklist item
// @access  Private
router.put('/:itemId', checkChecklistOwnership, async (req, res) => {
  try {
    const { label, category, is_packed } = req.body;
    const item = req.checklistItem;

    await item.update({
      label: label !== undefined ? label : item.label,
      category: category !== undefined ? category : item.category,
      is_packed: is_packed !== undefined ? is_packed : item.is_packed
    });

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/checklist/:itemId
// @desc    Remove checklist item
// @access  Private
router.delete('/:itemId', checkChecklistOwnership, async (req, res) => {
  try {
    const item = req.checklistItem;
    await item.destroy();
    res.json({ message: 'Checklist item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
