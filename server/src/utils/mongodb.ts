import { MongoClient } from 'mongodb';

let mongo: MongoClient;

const url = 'mongodb://localhost:27017/sismicvision';

declare global {
  var mongo: MongoClient;
}

if (!global.mongo) {
  global.mongo = new MongoClient(url);
}

mongo = global.mongo;

export default mongo;
