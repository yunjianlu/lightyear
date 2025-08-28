import client from "./connectToMongoDB";

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

export async function queryMongoDatabase(queryInstructions) {
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
    }
    // } finally {
    //     await client.close();
    // }

    return queryResult
}

export function composeQuery() {
    console.log("hello");
}