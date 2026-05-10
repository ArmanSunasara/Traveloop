const { User } = require('../models');

const adminMiddleware = async (req, res, next) => {
  try {
    // req.user is set by authMiddleware
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = adminMiddleware;
