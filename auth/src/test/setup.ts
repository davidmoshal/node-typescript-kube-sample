import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const { defaults } = require('jest-config');
console.log({ defaults })

let mongo: any;

// Start mongo server before start running test
beforeAll(async () => {
  console.log('beforeAll')
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
// Before each test reset collections
beforeEach(async () => {
  console.log('beforeEach')
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});
// Close connection after completing the testing process
afterAll(async () => {
  console.log('afterAll')
  await mongo.stop();
  await mongoose.connection.close();
});

afterEach(async () => {
  console.log("afterEach")
})