import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "productsDB";
const collectionName = "lightyearCollection";

export async function GET() {
  if (!uri) {
    return NextResponse.json(
      { error: "Missing MONGODB_URI env variable" },
      { status: 500 }
    );
  }
  let client;
  try {
    client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const products = await db.collection(collectionName).find({}).toArray();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (client) await client.close();
  }
}
