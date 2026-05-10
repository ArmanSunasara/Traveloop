const express = require('express');
const { Sequelize } = require('sequelize');
const { User, Trip, Stop, City, Activity, StopActivity, sequelize } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Require auth and admin role
router.use(authMiddleware);
router.use(adminMiddleware);

// @route   GET /api/admin/stats
// @desc    Get system statistics
// @access  Private/Admin
router.get('/stats', async (req, res) => {
  try {
    const total_users = await User.count();
    const total_trips = await Trip.count();
    const public_trips = await Trip.count({ where: { is_public: true } });

    // Top 5 cities by number of stops referencing them
    const top_cities = await City.findAll({
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "stops" AS "Stop"
              WHERE "Stop"."city_id" = "City"."id"
            )`),
            'stop_count'
          ]
        ]
      },
      order: [[Sequelize.literal('stop_count'), 'DESC']],
      limit: 5
    });

    // Top 5 activities by how many stops include them via StopActivity
    const top_activities = await Activity.findAll({
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "stop_activities" AS "StopActivity"
              WHERE "StopActivity"."activity_id" = "Activity"."id"
            )`),
            'stop_count'
          ]
        ]
      },
      order: [[Sequelize.literal('stop_count'), 'DESC']],
      limit: 5
    });

    // Trips per day (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const trips_per_day = await Trip.findAll({
      attributes: [
        [Sequelize.fn('date', Sequelize.col('created_at')), 'date'],
        [Sequelize.fn('count', Sequelize.col('id')), 'count']
      ],
      where: {
        created_at: {
          [Sequelize.Op.gte]: thirtyDaysAgo
        }
      },
      group: [Sequelize.fn('date', Sequelize.col('created_at'))],
      order: [[Sequelize.fn('date', Sequelize.col('created_at')), 'ASC']]
    });

    res.json({
      total_users,
      total_trips,
      public_trips,
      top_cities,
      top_activities,
      trips_per_day
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/admin/users
// @desc    Get paginated list of all users
// @access  Private/Admin
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const { count, rows: users } = await User.findAndCountAll({
      attributes: [
        'id', 'name', 'email', 'created_at', 'role',
        [
          Sequelize.literal(`(
            SELECT COUNT(*)
            FROM "trips" AS "Trip"
            WHERE "Trip"."user_id" = "User"."id"
          )`),
          'trip_count'
        ]
      ],
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });

    res.json({
      total: count,
      page,
      pages: Math.ceil(count / limit),
      users
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
