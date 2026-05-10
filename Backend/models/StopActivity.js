const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const StopActivity = sequelize.define('StopActivity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // stop_id and activity_id will be added by association
  }, {
    tableName: 'stop_activities',
    timestamps: false,
  });

  return StopActivity;
};
