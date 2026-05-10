const db = require('./models');

const sampleCities = [
  { name: 'Paris', country: 'France', region: 'Ile-de-France', cost_index: 5, popularity_score: 9.8 },
  { name: 'Tokyo', country: 'Japan', region: 'Kanto', cost_index: 4, popularity_score: 9.9 },
  { name: 'New York', country: 'USA', region: 'New York', cost_index: 5, popularity_score: 9.5 },
  { name: 'Rome', country: 'Italy', region: 'Lazio', cost_index: 4, popularity_score: 9.7 },
  { name: 'Bangkok', country: 'Thailand', region: 'Central Thailand', cost_index: 2, popularity_score: 9.2 },
  { name: 'London', country: 'UK', region: 'England', cost_index: 5, popularity_score: 9.6 },
  { name: 'Dubai', country: 'UAE', region: 'Emirate of Dubai', cost_index: 4, popularity_score: 9.0 },
  { name: 'Singapore', country: 'Singapore', region: 'Singapore', cost_index: 4, popularity_score: 9.3 },
  { name: 'Barcelona', country: 'Spain', region: 'Catalonia', cost_index: 3, popularity_score: 9.4 },
  { name: 'Istanbul', country: 'Turkey', region: 'Marmara', cost_index: 2, popularity_score: 9.1 },
];

const seedDatabase = async () => {
  try {
    // Sync models
    await db.sequelize.sync({ force: true }); // WARNING: force:true will drop existing tables!
    console.log('Database synced for seeding.');

    // Seed Cities
    const createdCities = await db.City.bulkCreate(sampleCities);
    console.log('Cities seeded.');

    // Seed Activities (3 for each city)
    const activitiesData = [];
    const types = ['Sightseeing', 'Food', 'Adventure', 'Culture', 'Relaxation'];

    createdCities.forEach((city, index) => {
      for (let i = 1; i <= 3; i++) {
        activitiesData.push({
          city_id: city.id,
          name: `${city.name} Activity ${i}`,
          type: types[(index + i) % types.length],
          cost: (Math.random() * 100).toFixed(2),
          duration: Math.floor(Math.random() * 180) + 60, // 60 to 240 mins
          description: `Enjoy a wonderful ${types[(index + i) % types.length].toLowerCase()} experience in ${city.name}.`,
          image_url: `https://via.placeholder.com/150?text=${city.name}+Activity+${i}`,
        });
      }
    });

    await db.Activity.bulkCreate(activitiesData);
    console.log('Activities seeded (30 total).');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
