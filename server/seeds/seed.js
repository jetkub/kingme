const db = require('../config/connection');
const { User, Game } = require('../models');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
    await User.deleteMany({});
    await User.create(userSeeds);
    console.log('users seeded');
    
    process.exit(0);
    });

