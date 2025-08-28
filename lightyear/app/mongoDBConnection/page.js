import React from "react";
import Image from "next/image";
import Layout from "../components/Layout";
import { queryMongoDatabase, testDatabaseConnection } from "../queryMongoDB";

export default async function LightyearBackground() {
  const isConnected = await testDatabaseConnection();
  //const allRecords = await queryMongoDatabase({});
  const allRecords = await queryMongoDatabase({"productMainInfo.productName": "Mandalorian Beskar Spear"});
  console.log("DB connected status: " + isConnected);
  console.log("Here is all records: ");
  console.log(allRecords);
  const processedRecords = allRecords.map((record) => (<div key={record.productMainInfo.productID}>
    <p>hello there!</p>
    <p>{record.productMainInfo.productName}</p>
  </div>))
    return (
    <Layout>
    <h1>Hello2</h1>
    <p>{isConnected ? "yes" : "no"}</p>
    {processedRecords}
    </Layout>
  );
}