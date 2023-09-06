const db = require('../config/connection');
const { User } = require('../models');
const thoughtSeeds = require('./userSeeds.json');

db.once('open', async () => {
  await User.create(userSeeds);

  console.log('It worked!');
  process.exit(0);
});