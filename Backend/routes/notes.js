const express = require('express');
const { Trip, Note, Stop } = require('../models');
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

// Middleware to check note ownership via its trip
const checkNoteOwnership = async (req, res, next) => {
  try {
    const note = await Note.findByPk(req.params.id, {
      include: [{ model: Trip }]
    });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.Trip.user_id !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    req.note = note;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/notes/trips/:id
// @desc    Get all notes for a trip
// @access  Private
router.get('/trips/:id', checkTripOwnership, async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { trip_id: req.params.id },
      include: [{ model: Stop }],
      order: [['created_at', 'DESC']]
    });

    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/notes/trips/:id
// @desc    Create a note for a trip
// @access  Private
router.post('/trips/:id', checkTripOwnership, async (req, res) => {
  try {
    const { content, stop_id } = req.body;

    // Optional: Validate that stop_id belongs to the trip
    if (stop_id) {
      const stop = await Stop.findOne({ where: { id: stop_id, trip_id: req.params.id } });
      if (!stop) {
        return res.status(400).json({ message: 'Invalid stop_id for this trip' });
      }
    }

    const newNote = await Note.create({
      trip_id: req.params.id,
      stop_id: stop_id || null,
      content
    });

    res.json(newNote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/notes/:id
// @desc    Update a note
// @access  Private
router.put('/:id', checkNoteOwnership, async (req, res) => {
  try {
    const { content } = req.body;
    const note = req.note;

    await note.update({
      content: content !== undefined ? content : note.content
    });

    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete('/:id', checkNoteOwnership, async (req, res) => {
  try {
    const note = req.note;
    await note.destroy();
    res.json({ message: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
