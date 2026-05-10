const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const City = sequelize.define('City', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cost_index: {
      type: DataTypes.INTEGER, // e.g., 1 to 5 scale
      allowNull: true,
    },
    popularity_score: {
      type: DataTypes.FLOAT, // e.g., 1.0 to 10.0 scale
      allowNull: true,
    },
  }, {
    tableName: 'cities',
    timestamps: false,
  });

  return City;
};
