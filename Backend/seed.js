const db = require('./models');

const sampleCities = [
  { name: 'Paris', country: 'France', region: 'Europe', cost_index: 5, popularity_score: 9.8 },
  { name: 'Tokyo', country: 'Japan', region: 'Asia', cost_index: 4, popularity_score: 9.9 },
  { name: 'New York', country: 'USA', region: 'North America', cost_index: 5, popularity_score: 9.5 },
  { name: 'Rome', country: 'Italy', region: 'Europe', cost_index: 4, popularity_score: 9.7 },
  { name: 'Bangkok', country: 'Thailand', region: 'Asia', cost_index: 2, popularity_score: 9.2 },
  { name: 'London', country: 'UK', region: 'Europe', cost_index: 5, popularity_score: 9.6 },
  { name: 'Dubai', country: 'UAE', region: 'Middle East', cost_index: 4, popularity_score: 9.0 },
  { name: 'Singapore', country: 'Singapore', region: 'Asia', cost_index: 4, popularity_score: 9.3 },
  { name: 'Barcelona', country: 'Spain', region: 'Europe', cost_index: 3, popularity_score: 9.4 },
  { name: 'Istanbul', country: 'Turkey', region: 'Europe', cost_index: 2, popularity_score: 9.1 },
  { name: 'Sydney', country: 'Australia', region: 'Oceania', cost_index: 4, popularity_score: 9.0 },
  { name: 'Cape Town', country: 'South Africa', region: 'Africa', cost_index: 2, popularity_score: 8.8 },
  { name: 'Bali', country: 'Indonesia', region: 'Asia', cost_index: 1, popularity_score: 9.1 },
  { name: 'Lisbon', country: 'Portugal', region: 'Europe', cost_index: 3, popularity_score: 8.9 },
  { name: 'Marrakech', country: 'Morocco', region: 'Africa', cost_index: 2, popularity_score: 8.7 },
  { name: 'Kyoto', country: 'Japan', region: 'Asia', cost_index: 4, popularity_score: 9.4 },
  { name: 'Prague', country: 'Czech Republic', region: 'Europe', cost_index: 2, popularity_score: 8.8 },
  { name: 'Reykjavik', country: 'Iceland', region: 'Europe', cost_index: 5, popularity_score: 8.6 },
  { name: 'Buenos Aires', country: 'Argentina', region: 'South America', cost_index: 2, popularity_score: 8.5 },
  { name: 'Santorini', country: 'Greece', region: 'Europe', cost_index: 4, popularity_score: 9.2 },
];

// Real-sounding activities per city
const activitiesByCity = {
  'Paris': [
    { name: 'Eiffel Tower Sunset Visit', type: 'Sightseeing', cost: 26.00, duration: 120, description: 'Ascend the iconic iron tower for breathtaking panoramic views of Paris at sunset.' },
    { name: 'Louvre Museum Guided Tour', type: 'Culture', cost: 45.00, duration: 180, description: 'Explore the world\'s largest art museum with a knowledgeable guide through its most famous galleries.' },
    { name: 'Seine River Evening Cruise', type: 'Sightseeing', cost: 35.00, duration: 90, description: 'Glide along the Seine and see Notre-Dame, the Musée d\'Orsay, and Parisian bridges illuminated at night.' },
    { name: 'French Pastry Workshop', type: 'Food', cost: 85.00, duration: 150, description: 'Learn to make croissants and macarons from a Parisian pâtissier in a hands-on baking class.' },
  ],
  'Tokyo': [
    { name: 'Tsukiji Outer Market Food Tour', type: 'Food', cost: 60.00, duration: 180, description: 'Sample sushi, tamagoyaki, and street food specialties with a local guide at the legendary market.' },
    { name: 'Sensō-ji Temple & Asakusa Walk', type: 'Culture', cost: 0.00, duration: 120, description: 'Visit Tokyo\'s oldest temple, browse the Nakamise shopping street, and experience traditional Asakusa.' },
    { name: 'Shibuya Crossing & Harajuku Tour', type: 'Sightseeing', cost: 15.00, duration: 150, description: 'Experience the world\'s busiest pedestrian crossing and explore Harajuku\'s colorful fashion district.' },
    { name: 'Teamlab Borderless Digital Art Museum', type: 'Culture', cost: 32.00, duration: 120, description: 'Immerse yourself in stunning digital art installations that react to your presence and movement.' },
  ],
  'New York': [
    { name: 'Central Park Walking Tour', type: 'Sightseeing', cost: 20.00, duration: 120, description: 'Discover hidden gems in the world\'s most famous urban park with a professional guide.' },
    { name: 'Broadway Show Experience', type: 'Culture', cost: 150.00, duration: 180, description: 'Watch a world-class Broadway production at one of Times Square\'s iconic theaters.' },
    { name: 'Brooklyn Bridge Sunset Walk', type: 'Sightseeing', cost: 0.00, duration: 90, description: 'Walk across the iconic Brooklyn Bridge at sunset for unforgettable Manhattan skyline views.' },
    { name: 'Chelsea Market Food Crawl', type: 'Food', cost: 55.00, duration: 120, description: 'Taste artisan foods, wines, and gourmet treats at Manhattan\'s premier food hall.' },
  ],
  'Rome': [
    { name: 'Colosseum & Roman Forum Tour', type: 'Sightseeing', cost: 48.00, duration: 180, description: 'Skip the line and explore ancient Rome\'s most impressive amphitheater with an expert historian.' },
    { name: 'Vatican Museums & Sistine Chapel', type: 'Culture', cost: 55.00, duration: 240, description: 'Marvel at Michelangelo\'s masterpiece and explore the vast papal art collections.' },
    { name: 'Trastevere Evening Food Tour', type: 'Food', cost: 70.00, duration: 180, description: 'Taste authentic Roman cuisine including supplì, cacio e pepe, and gelato in Rome\'s foodie neighborhood.' },
  ],
  'Bangkok': [
    { name: 'Grand Palace & Wat Phra Kaew', type: 'Sightseeing', cost: 15.00, duration: 150, description: 'Visit the stunning royal palace complex and the Temple of the Emerald Buddha.' },
    { name: 'Floating Market Day Trip', type: 'Culture', cost: 35.00, duration: 300, description: 'Explore the colorful Damnoen Saduak floating market by long-tail boat and sample local delicacies.' },
    { name: 'Bangkok Street Food Night Tour', type: 'Food', cost: 40.00, duration: 180, description: 'Taste pad thai, mango sticky rice, and other delicacies at the best street food stalls with a local guide.' },
  ],
  'London': [
    { name: 'Tower of London & Crown Jewels', type: 'Culture', cost: 33.00, duration: 180, description: 'Explore 1000 years of royal history and see the dazzling Crown Jewels collection.' },
    { name: 'Afternoon Tea at The Ritz', type: 'Food', cost: 75.00, duration: 120, description: 'Enjoy a quintessential British afternoon tea experience with scones, finger sandwiches, and pastries.' },
    { name: 'Harry Potter Studio Tour', type: 'Culture', cost: 55.00, duration: 240, description: 'Walk through the actual sets used in the films and discover the magic behind the movies.' },
  ],
  'Dubai': [
    { name: 'Desert Safari & BBQ Dinner', type: 'Adventure', cost: 80.00, duration: 360, description: 'Experience dune bashing, camel riding, and traditional entertainment under the desert stars.' },
    { name: 'Burj Khalifa Observation Deck', type: 'Sightseeing', cost: 45.00, duration: 90, description: 'Visit the 148th floor of the world\'s tallest building for incredible 360-degree views of Dubai.' },
    { name: 'Dubai Marina Dhow Cruise', type: 'Relaxation', cost: 55.00, duration: 120, description: 'Enjoy a traditional wooden dhow cruise with dinner along the stunning Dubai Marina skyline.' },
  ],
  'Singapore': [
    { name: 'Gardens by the Bay Night Show', type: 'Sightseeing', cost: 20.00, duration: 120, description: 'Witness the spectacular Supertree light show and explore the Cloud Forest dome.' },
    { name: 'Hawker Centre Food Trail', type: 'Food', cost: 25.00, duration: 150, description: 'Sample Michelin-starred hawker dishes including chicken rice and laksa at heritage food centers.' },
    { name: 'Marina Bay Sands SkyPark', type: 'Sightseeing', cost: 26.00, duration: 60, description: 'Take in panoramic views of the city from atop the iconic Marina Bay Sands hotel.' },
  ],
  'Barcelona': [
    { name: 'Sagrada Familia Guided Tour', type: 'Culture', cost: 38.00, duration: 120, description: 'Explore Gaudí\'s unfinished masterpiece with a guide who reveals hidden symbolism and details.' },
    { name: 'La Boqueria Market & Tapas Tour', type: 'Food', cost: 65.00, duration: 180, description: 'Taste traditional Catalan flavors and learn about local ingredients at Barcelona\'s famous market.' },
    { name: 'Gothic Quarter Walking Tour', type: 'Sightseeing', cost: 15.00, duration: 120, description: 'Wander through medieval streets, discover hidden squares, and uncover 2000 years of history.' },
  ],
  'Istanbul': [
    { name: 'Hagia Sophia & Blue Mosque Tour', type: 'Culture', cost: 30.00, duration: 180, description: 'Visit two of the most impressive religious buildings in the world with an expert historian guide.' },
    { name: 'Grand Bazaar Shopping Experience', type: 'Culture', cost: 10.00, duration: 150, description: 'Navigate the labyrinthine Grand Bazaar with a local guide and learn the art of Turkish bargaining.' },
    { name: 'Bosphorus Sunset Cruise', type: 'Sightseeing', cost: 25.00, duration: 120, description: 'Sail between two continents and admire waterfront palaces, mosques, and Ottoman mansions.' },
  ],
  'Sydney': [
    { name: 'Sydney Opera House Backstage Tour', type: 'Culture', cost: 45.00, duration: 120, description: 'Go behind the scenes of the iconic Opera House and discover its architectural secrets.' },
    { name: 'Bondi to Coogee Coastal Walk', type: 'Adventure', cost: 0.00, duration: 180, description: 'Hike the famous 6km coastal trail with stunning ocean views, hidden beaches, and rock pools.' },
    { name: 'Harbour Bridge Climb', type: 'Adventure', cost: 175.00, duration: 210, description: 'Scale the iconic Sydney Harbour Bridge for panoramic views of the city and harbor.' },
  ],
  'Cape Town': [
    { name: 'Table Mountain Cable Car', type: 'Sightseeing', cost: 20.00, duration: 120, description: 'Ride the revolving cable car to the summit for spectacular views of the city and Atlantic Ocean.' },
    { name: 'Cape Peninsula Day Tour', type: 'Adventure', cost: 85.00, duration: 480, description: 'Drive along the stunning coast to Cape Point, visit penguin colonies, and see the Cape of Good Hope.' },
    { name: 'Bo-Kaap Cooking Class', type: 'Food', cost: 55.00, duration: 180, description: 'Learn to cook Cape Malay cuisine in the colorful Bo-Kaap neighborhood with a local chef.' },
  ],
  'Bali': [
    { name: 'Ubud Rice Terrace Trek', type: 'Adventure', cost: 15.00, duration: 180, description: 'Walk through the stunning Tegallalang rice terraces and learn about traditional Balinese irrigation.' },
    { name: 'Traditional Balinese Spa', type: 'Relaxation', cost: 40.00, duration: 120, description: 'Enjoy a rejuvenating Balinese massage, flower bath, and body scrub at a luxury jungle spa.' },
    { name: 'Sunrise at Mount Batur', type: 'Adventure', cost: 50.00, duration: 360, description: 'Trek to the summit of an active volcano for a breathtaking sunrise above the clouds.' },
  ],
  'Lisbon': [
    { name: 'Pastel de Nata Workshop', type: 'Food', cost: 45.00, duration: 120, description: 'Learn to make Portugal\'s famous custard tarts from scratch with a local pastry chef.' },
    { name: 'Alfama District Walking Tour', type: 'Culture', cost: 18.00, duration: 150, description: 'Explore the oldest neighborhood in Lisbon, hear live Fado music, and discover hidden miradouros.' },
    { name: 'Sintra Palace Day Trip', type: 'Sightseeing', cost: 60.00, duration: 420, description: 'Visit the colorful Pena Palace and mysterious Quinta da Regaleira in the fairy-tale town of Sintra.' },
  ],
  'Marrakech': [
    { name: 'Medina & Souks Guided Tour', type: 'Culture', cost: 25.00, duration: 180, description: 'Navigate the labyrinthine medina with a local guide through spice souks, tanneries, and hidden riads.' },
    { name: 'Moroccan Cooking Class', type: 'Food', cost: 40.00, duration: 240, description: 'Shop for spices in the market and learn to prepare traditional tagine and couscous dishes.' },
    { name: 'Hot Air Balloon Over Atlas Mountains', type: 'Adventure', cost: 180.00, duration: 240, description: 'Float above the Atlas Mountains at sunrise for panoramic views of the Moroccan landscape.' },
  ],
  'Kyoto': [
    { name: 'Fushimi Inari Shrine Hike', type: 'Culture', cost: 0.00, duration: 180, description: 'Walk through thousands of vermillion torii gates winding up the mountain at this iconic shrine.' },
    { name: 'Traditional Tea Ceremony', type: 'Culture', cost: 35.00, duration: 90, description: 'Experience the meditative art of Japanese tea ceremony in a centuries-old tea house.' },
    { name: 'Arashiyama Bamboo Grove', type: 'Sightseeing', cost: 5.00, duration: 120, description: 'Stroll through towering bamboo stalks and visit the photogenic Tenryū-ji Temple garden.' },
  ],
  'Prague': [
    { name: 'Prague Castle & St. Vitus Tour', type: 'Culture', cost: 15.00, duration: 180, description: 'Explore the world\'s largest ancient castle complex and the stunning Gothic cathedral.' },
    { name: 'Czech Beer Tasting Tour', type: 'Food', cost: 45.00, duration: 180, description: 'Sample traditional Czech lagers, craft beers, and bar snacks at historic Prague pubs.' },
    { name: 'Charles Bridge Sunrise Photography', type: 'Sightseeing', cost: 30.00, duration: 120, description: 'Capture the magic of Charles Bridge at sunrise with a professional photography guide.' },
  ],
  'Reykjavik': [
    { name: 'Golden Circle Day Tour', type: 'Sightseeing', cost: 95.00, duration: 600, description: 'Visit Thingvellir National Park, Geysir geothermal area, and Gullfoss waterfall in one epic day.' },
    { name: 'Blue Lagoon Spa Experience', type: 'Relaxation', cost: 85.00, duration: 240, description: 'Soak in the milky blue geothermal waters surrounded by black lava fields and steam.' },
    { name: 'Northern Lights Hunting Tour', type: 'Adventure', cost: 70.00, duration: 240, description: 'Chase the aurora borealis into the Icelandic countryside with expert guides.' },
  ],
  'Buenos Aires': [
    { name: 'Tango Show & Dinner', type: 'Culture', cost: 65.00, duration: 180, description: 'Watch a passionate tango performance while enjoying a traditional Argentine steak dinner.' },
    { name: 'La Boca & Caminito Walking Tour', type: 'Sightseeing', cost: 20.00, duration: 150, description: 'Explore the colorful streets of La Boca, birthplace of tango and Argentine passion.' },
    { name: 'Argentine Wine Tasting', type: 'Food', cost: 50.00, duration: 120, description: 'Sample premium Malbecs and other Argentine wines paired with local cheeses and empanadas.' },
  ],
  'Santorini': [
    { name: 'Oia Sunset Viewing', type: 'Sightseeing', cost: 0.00, duration: 90, description: 'Watch the world-famous sunset paint the sky over the caldera from the village of Oia.' },
    { name: 'Caldera Catamaran Cruise', type: 'Adventure', cost: 120.00, duration: 300, description: 'Sail around the volcanic caldera, swim in hot springs, and enjoy a BBQ dinner at sea.' },
    { name: 'Wine Tasting Tour', type: 'Food', cost: 55.00, duration: 180, description: 'Visit three unique wineries and taste volcanic wines made from Santorini\'s indigenous grape varieties.' },
  ],
};

const seedDatabase = async () => {
  try {
    // Sync models
    await db.sequelize.sync({ force: true }); // WARNING: force:true will drop existing tables!
    console.log('Database synced for seeding.');

    // Seed Cities
    const createdCities = await db.City.bulkCreate(sampleCities);
    console.log(`✅ ${createdCities.length} cities seeded.`);

    // Seed Activities for each city
    let totalActivities = 0;
    for (const city of createdCities) {
      const cityActivities = activitiesByCity[city.name];
      if (cityActivities) {
        const activitiesData = cityActivities.map(a => ({
          ...a,
          city_id: city.id,
          image_url: null,
        }));
        await db.Activity.bulkCreate(activitiesData);
        totalActivities += activitiesData.length;
      }
    }
    console.log(`✅ ${totalActivities} activities seeded.`);

    console.log('\n🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
