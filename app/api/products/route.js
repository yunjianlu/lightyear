import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
export const runtime = "nodejs";

const uri = process.env.MONGODB_URI;
const dbName = "productsDB";
const collectionName = "lightyearCollection";

export async function GET(request) {
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
    let products;
    let queryParams = new URL(request.url).searchParams;
    
    if (queryParams.toString().length > 0) {
      let productSearchQuery = {};

      if (queryParams.get("category") != null) {
        productSearchQuery.category = queryParams.get("category")
      }

      if (queryParams.get("price") != null) {
        productSearchQuery.price = {$lte: parseInt(queryParams.get("price"))}
      }

      if (queryParams.get("rating") != null) {
        productSearchQuery.starRating = {$gte: parseFloat(queryParams.get("rating"))}
      }

      if (queryParams.get("inStock") != null && queryParams.get("outOfStock") == null) {
        productSearchQuery.quantityInStock = {$gt: 0}
      }
      if (queryParams.get("outOfStock") != undefined && queryParams.get("inStock") == undefined) {
        productSearchQuery.quantityInStock = 0
      }

      if (queryParams.get("search") != undefined) {
        productSearchQuery.$or = [
          {productName: {$regex: queryParams.get("search"), $options: "i"}},
          {vendor: {$regex: queryParams.get("search"), $options: "i"}},
          {productDescription: {$regex: queryParams.get("search"), $options: "i"}},
          {category: {$regex: queryParams.get("search"), $options: "i"}},
          {"productDetails.color": {$regex: queryParams.get("search"), $options: "i"}},
          {"productDetails.material": {$regex: queryParams.get("search"), $options: "i"}},
          {topReview: {$regex: queryParams.get("search"), $options: "i"}},
          {tags: {$regex: queryParams.get("search"), $options: "i"}}
        ]
      }

      if (queryParams.get("id") != null) {
        productSearchQuery.productId = queryParams.get("id")
      }

      products = await db.collection(collectionName).find(productSearchQuery).toArray(function(err, result) {
            if (err) throw err;
        });
    }
    else {
      console.log("no query found for filtering")
      products = await db.collection(collectionName).find({}).toArray(function(err, result) {
            if (err) throw err;
        });
    }
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (client) await client.close();
  }
}

export async function testDatabaseConnection() {
    let isConnected = false;

    try {
        const mongoClient = await client.connect();

        await mongoClient.db("reader").command({ping: 1});
        console.log(
            "Pinged MongoDB"
        );
        isConnected = true;
    } catch (e) {
        console.error(e);
    }
    
    return isConnected
}

export async function POST(queryInstructions) {
    let queryResult;
    try {
        if (!client) {
            throw new Error ("client isn't connected unfortunately");
        }
        const mongoClient = await client.db("productsDB").collection("lightyearCollection");

        queryResult = await mongoClient.find(queryInstructions).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
        });

        console.log(
            queryResult
        );
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

    return queryResult
}