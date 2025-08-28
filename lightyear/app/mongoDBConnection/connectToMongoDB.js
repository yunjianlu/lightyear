import {MongoClient} from "mongodb";

if(!process.env.MONGODB_URI) {
    throw new Error('No database connection string available');
}
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
export default client;