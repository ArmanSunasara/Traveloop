const express = require('express');
const { Trip, Stop, Activity, Budget } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Helper function to calculate activity costs
const calculateActivityCosts = async (tripId) => {
  const trip = await Trip.findByPk(tripId, {
    include: [
      {
        model: Stop,
        include: [{ model: Activity }]
      }
    ]
  });

  if (!trip) return 0;

  let totalActivityCost = 0;
  trip.Stops.forEach(stop => {
    stop.Activities.forEach(activity => {
      totalActivityCost += parseFloat(activity.cost || 0);
    });
  });

  return totalActivityCost;
};

// @route   GET /api/budget/trips/:id
// @desc    Get trip budget
// @access  Private
// (Note: route is defined as /trips/:id to handle /api/budget/trips/:id)
router.get('/trips/:id', async (req, res) => {
  try {
    const tripId = req.params.id;
    const trip = await Trip.findByPk(tripId);

    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.user_id !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    // Auto-calculate activities cost
    const activitiesCost = await calculateActivityCosts(tripId);

    // Fetch manual budget
    const manualBudget = await Budget.findOne({ where: { trip_id: tripId } });

    const transport = manualBudget ? parseFloat(manualBudget.transport || 0) : 0;
    const stay = manualBudget ? parseFloat(manualBudget.stay || 0) : 0;
    const meals = manualBudget ? parseFloat(manualBudget.meals || 0) : 0;
    
    const total = activitiesCost + transport + stay + meals;
    
    // Calculate average per day
    const startDate = new Date(trip.start_date);
    const endDate = new Date(trip.end_date);
    const days = Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));
    const average_per_day = total / days;

    res.json({
      activities: activitiesCost,
      transport,
      stay,
      meals,
      total,
      average_per_day
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/budget/trips/:id
// @desc    Update trip budget
// @access  Private
router.put('/trips/:id', async (req, res) => {
  try {
    const tripId = req.params.id;
    const trip = await Trip.findByPk(tripId);

    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.user_id !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    const { transport, stay, meals } = req.body;

    // Auto-calculate activities cost
    const activitiesCost = await calculateActivityCosts(tripId);

    const transportVal = parseFloat(transport || 0);
    const stayVal = parseFloat(stay || 0);
    const mealsVal = parseFloat(meals || 0);

    const total = activitiesCost + transportVal + stayVal + mealsVal;

    let budget = await Budget.findOne({ where: { trip_id: tripId } });

    if (budget) {
      budget = await budget.update({
        transport: transportVal,
        stay: stayVal,
        activities: activitiesCost,
        meals: mealsVal,
        total
      });
    } else {
      budget = await Budget.create({
        trip_id: tripId,
        transport: transportVal,
        stay: stayVal,
        activities: activitiesCost,
        meals: mealsVal,
        total
      });
    }

    res.json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
