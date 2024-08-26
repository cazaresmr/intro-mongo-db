const mongoose = require('mongoose');
const cuid = require('cuid');
const connect = require('./exercises/connect');

const url = 'mongodb://localhost:27017/intro-mongodb-testing';

global.newId = () => {
  return mongoose.Types.ObjectId();
};

beforeEach(async () => {
  const db = cuid();
  if (mongoose.connection.readyState === 0) {
    try {
      await connect(url + db);
    } catch (e) {
      console.error('Failed to connect to the database');
      throw e;
    }
  }

  // Clear the database before each test
  await clearDB();
});

afterEach(async () => {
  // Disconnect from the database after each test
  await mongoose.disconnect();
});

afterAll(async () => {
  // Ensure everything is cleaned up after all tests
  await mongoose.connection.close();
});

async function clearDB() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    if (Object.hasOwnProperty.call(collections, key)) {
      const collection = collections[key];
      try {
        await collection.deleteMany({});
      } catch (err) {
        console.error(`Error clearing collection ${collection.name}:`, err);
        throw err;
      }
    }
  }
}
