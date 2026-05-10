const sequelize = require('../config/db');

// Import models
const User = require('./User')(sequelize);
const Trip = require('./Trip')(sequelize);
const City = require('./City')(sequelize);
const Stop = require('./Stop')(sequelize);
const Activity = require('./Activity')(sequelize);
const StopActivity = require('./StopActivity')(sequelize);
const Budget = require('./Budget')(sequelize);
const ChecklistItem = require('./ChecklistItem')(sequelize);
const Note = require('./Note')(sequelize);

// Define Associations

// User -> Trips
User.hasMany(Trip, { foreignKey: 'user_id' });
Trip.belongsTo(User, { foreignKey: 'user_id' });

// Trip -> Stops
Trip.hasMany(Stop, { foreignKey: 'trip_id' });
Stop.belongsTo(Trip, { foreignKey: 'trip_id' });

// Trip -> Budget
Trip.hasOne(Budget, { foreignKey: 'trip_id' });
Budget.belongsTo(Trip, { foreignKey: 'trip_id' });

// Trip -> ChecklistItems
Trip.hasMany(ChecklistItem, { foreignKey: 'trip_id' });
ChecklistItem.belongsTo(Trip, { foreignKey: 'trip_id' });

// Trip -> Notes
Trip.hasMany(Note, { foreignKey: 'trip_id' });
Note.belongsTo(Trip, { foreignKey: 'trip_id' });

// Stop -> City
City.hasMany(Stop, { foreignKey: 'city_id' });
Stop.belongsTo(City, { foreignKey: 'city_id' });

// Stop <-> Activities (Many-to-Many through StopActivity)
Stop.belongsToMany(Activity, { through: StopActivity, foreignKey: 'stop_id' });
Activity.belongsToMany(Stop, { through: StopActivity, foreignKey: 'activity_id' });

// City -> Activities
City.hasMany(Activity, { foreignKey: 'city_id' });
Activity.belongsTo(City, { foreignKey: 'city_id' });

// Stop -> Notes (Nullable)
Stop.hasMany(Note, { foreignKey: 'stop_id' });
Note.belongsTo(Stop, { foreignKey: 'stop_id' });

module.exports = {
  sequelize,
  User,
  Trip,
  City,
  Stop,
  Activity,
  StopActivity,
  Budget,
  ChecklistItem,
  Note
};
