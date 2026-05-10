const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Budget = sequelize.define('Budget', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // trip_id will be added by association
    transport: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    stay: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    activities: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    meals: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
  }, {
    tableName: 'budgets',
    timestamps: false,
  });

  return Budget;
};
