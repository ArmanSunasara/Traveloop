const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Note = sequelize.define('Note', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // trip_id and stop_id will be added by association
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'notes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  return Note;
};
