const db = require('../config/connection');
const { User, Car, Day, Flight, Hotel, Item, Train, Trip, Transportation } = require('../models');
const userSeeds = require('./userSeeds.json');
// const bucketSeeds = require('./bucketSeeds.json');
const carSeeds = require('./carSeeds.json');
const trainSeeds = require('./trainSeeds.json');
const hotelSeeds = require('./hotelSeeds.json');
const itemSeeds = require('./itemSeeds.json');
const daySeeds = require('./daySeeds.json');
const tripSeeds = require('./tripSeeds.json');
const flightSeeds = require('./flightSeeds.json');


db.once('open', async () => {
  try {
    await Car.deleteMany({});
    await User.deleteMany({});
    await Day.deleteMany({});
    await Flight.deleteMany({});
    await Hotel.deleteMany({});
    await Item.deleteMany({});
    await Train.deleteMany({});
    await Trip.deleteMany({});


    await User.create(userSeeds);
    await Car.create(carSeeds);
    await Flight.create(flightSeeds);
    await Hotel.create(hotelSeeds);
    await Item.create(itemSeeds);
    await Train.create(trainSeeds);
    await Day.create(daySeeds);
    await Trip.create(tripSeeds);
    

    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
