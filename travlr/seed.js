
const mongoose = require('mongoose');
const Trip = require('./app_server/models/travlr');
const trips = require('./data/trips.json');

const dbURI = 'mongodb://127.0.0.1/travlr';


async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB');

        // Insert trips only if they do not already exist
        for (const tripData of trips) {
            const existingTrip = await Trip.findOne({
                code: tripData.code
            });

            if (existingTrip) {
                console.log(`Trip already exists: ${tripData.name}`);
            } else {
                await Trip.create(tripData);
                console.log(`Trip added: ${tripData.name}`);
            }
        }

        console.log('Database seeding completed!');
    } catch (error) {
        console.error('Database seeding failed:', error);
        process.exitCode = 1;
    } finally {
        // Close the database connection
        await mongoose.disconnect();
    }
}



seedDatabase();
