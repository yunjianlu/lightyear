"use server"
import Layout from "../../components/Layout";
import Image from "next/image";
import AddToCartButton from "../../components/addToCartButton";
import { queryMongoDatabase } from "../../mongoDBConnection/queryMongoDB";
//import { getServerSideProps } from "next/dist/build/templates/pages";
import useSWR from "swr/immutable";

import { Suspense } from "react";

async function DescriptionContent({productIdParam}) {

  // const fetcher = (url) => fetch(url).then((res) => res.json());
  // const {
  //   data: products = [],
  //   error,
  //   isLoading,
  // } = useSWR("/api/products", fetcher);

  // if (isLoading) return <div>Loading product...</div>;
  // if (error) return <div>Error loading product.</div>;

  let product = await queryMongoDatabase({productId: productIdParam});
  if (product.length == 1) {
    product = product[0]
  }
  else {
    return (
      <Layout>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <p>The product you are looking for does not exist.</p>
        </div>
      </Layout>
    )
  }
  product._id = product._id.toString();

  let starRatingCount = 1;
  let starRatingString = "";

  starRatingCount = Math.floor(product.starRating);

  for (let i = 0; i < starRatingCount; i++) {
    starRatingString += "⭐";
  }
  starRatingString += "\n";

  return (
    <Layout>
      <div className="p-8 mt-10 md:mt-2 grid grid-cols-1 md:grid-cols-3 md:gap-2 grid-flow-row md:grid-flow-col md:grid-rows-[min-content_min-content] min-h-[92vh]">
        <div id="leftScrollStick" className="row-span-2">
          <div className="p-4 grid grid-cols-2 grid-rows-[8rem_auto_auto_auto] md:grid-rows-[8rem_minmax(15rem,26rem)_auto_auto] bg-gray-300 mb-2 rounded-3xl">
            <div className="col-span-2 flex justify-center items-center">
              <h1
                className={
                  (product.productName.length > 19
                    ? "wrap-normal text-wrap text-4xl md:text-5xl text-center"
                    : "wrap-normal text-wrap text-5xl md:text-6xl text-center") +
                  " text-gray-900"
                }
              >
                {product.productName || "Unknown Name"}
              </h1>
            </div>
            <div className="col-1 col-span-2 flex">
              <Image
                src={
                  product.productImage ||
                  "/images/products/lightsaber-blue.png"
                }
                alt={product.productName}
                width={400}
                height={192}
                className="w-full object-contain rounded m-4 mx-auto p-2"
              />
            </div>
            <div className="col-span-1 row-span-1 flex justify-center items-center whitespace-pre-wrap">
              <p className="text-gray-800 text-center md:text-xl">
                {product.starRating
                  ? product.starRating +
                    " " +
                    starRatingString +
                    `(${product.numberOfReviews}) reviews`
                  : "Unknown Rating"}
              </p>
            </div>
            <div className="col-span-1 sm:row-span-1 flex justify-center items-center">
              <p className="text-gray-800 md:text-xl">
                Price: ${product.price || "Unknown Rating"}
              </p>
            </div>
            <div className="col-1 col-span-2 flex justify-center items-center p-4 md:text-xl">
              <AddToCartButton product={product} />
            </div>
          </div>

          <div className="grid grid-cols-2 grid-flow-row bg-black gap-y-0.25 auto-rows-min h-min mb-2 md:mb-0 rounded-3xl mb-3">
            <div className="col-span-2 bg-white flex items-center justify-center rounded-t-3xl">
              <h1 className="text-2xl m-2 text-gray-900 md:mb-5 md:text-4xl md:mt-2">Statistics</h1>
            </div>
            <h2 className="bg-white pl-2 text-gray-800 md:text-xl">Quantity In Stock</h2>
            <div className="flex justify-center bg-white">
              <p className="m-auto md:text-xl">{product.quantityInStock || 0}</p>
            </div>
            <h2 className="bg-white pl-2 text-gray-800 md:text-xl">
              Frequently Returned
            </h2>
            <div className="flex justify-center bg-white">
              <p className="m-auto md:text-xl">
                {product.frequentlyReturned ? "Yes" : "No"}
              </p>
            </div>
            <h2 className="bg-white pl-2 text-gray-800 rounded-bl-3xl h-[110%] md:text-xl">
              Times Ordered in Past Month
            </h2>
            <div className="flex justify-center bg-white rounded-br-3xl h-[110%]">
              <p className="m-auto md:text-xl">
                {product.orderedQuantityPastMonth || 0}
              </p>
            </div>
          </div>
        </div>

        <div
          id="rightScrollExpand"
          className="row-span-2 md:grid-cols-2 md:col-span-2 grid md:gap-2"
        >
          <div className="flex bg-gray-300 min-h-40 flex-col md:col-span-2 mb-2 md:mb-0 items-center rounded-3xl">
            <h1 className="text-2xl col-span-2 text-gray-900 md:text-4xl md:mt-2">
              Description
            </h1>
            <p className="mx-2 md:mt-5 self-start text-gray-800 md:text-xl">
              {product.productDescription || "No description available"}
            </p>
          </div>
          <div className="grid grid-flow-row bg-black grid-cols-2 gap-y-0.25 auto-rows-min h-min mb-3 md:mb-0 md:col-span-1 rounded-3xl">
            <div className="col-span-2 bg-white flex items-center justify-center rounded-t-3xl">
              <h1 className="text-2xl m-2 text-gray-900 md:mb-5 md:text-4xl md:mt-2">Specifications</h1>
            </div>
            <h2 className="bg-white pl-2 text-gray-800 md:text-xl">Product ID</h2>
            <div className="flex justify-center bg-white md:text-xl">
              <p>{product.productId || "No product ID available"}</p>
            </div>
            <h2 className="bg-white pl-2 text-gray-800 md:text-xl">Vendor</h2>
            <div className="flex justify-center bg-white md:text-xl">
              <p>{product.vendor || "Unknown"}</p>
            </div>
            <h2 className="bg-white pl-2 text-gray-800 md:text-xl">Dimensions</h2>
            <div className="flex justify-center bg-white md:text-xl">
              <p>{product.productDetails?.dimensions || "Unknown"}</p>
            </div>
            <h2 className="bg-white pl-2 text-gray-800 md:text-xl">Color</h2>
            <div className="flex justify-center bg-white md:text-xl">
              <p>{product.productDetails?.color || "Unknown"}</p>
            </div>
            <h2 className="bg-white pl-2 text-gray-800 md:text-xl">Material</h2>
            <div className="flex justify-center bg-white md:text-xl">
              <p>{product.productDetails?.material || "Unknown"}</p>
            </div>
            <h2 className="bg-white pl-2 text-gray-800 md:text-xl">Weight</h2>
            <div className="flex justify-center bg-white md:text-xl">
              <p>{product.productDetails?.weight || "Unknown"}</p>
            </div>
            <h2 className="bg-white pl-2 text-gray-800 md:text-xl">Place of Origin</h2>
            <div className="flex justify-center bg-white md:text-xl">
              <p>{product.productDetails?.originLocation || "Unknown"}</p>
            </div>
            <h2 className="bg-white pl-2 text-gray-800 md:text-xl">
              Batteries Included
            </h2>
            <div className="flex justify-center bg-white md:text-xl">
              <p>{product.productDetails?.batteriesIncluded || "Unknown"}</p>
            </div>
            <h2 className="bg-white pl-2 text-gray-800 rounded-bl-3xl h-[110%] md:text-xl">Grogu Approved?</h2>
            <div className="flex justify-center bg-white rounded-br-3xl h-[110%] md:text-xl">
              <p>{product.productDetails?.groguApproved ? "Yes" : "No"}</p>
            </div>
          </div>
          <div className="flex bg-white min-h-18 flex-col h-min md:col-span-1 flex-wrap rounded-3xl">
            <h1 className="text-2xl bg-white mx-auto mt-2 text-gray-900 md:mb-3 md:text-4xl md:mt-2">
              Tags
            </h1>
            <div className="flex flex-row flex-wrap px-1 pt-1 pb-3">
              {product.tags.map((tag) => (
                <div className="m-1 p-1 bg-blue-500 rounded-xl text-white" key={tag}>
                  <p>{tag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default async function DetailedProductPage({ searchParams }) {
  let fetchedSearchParams = await searchParams;
  let productIdFromURL = fetchedSearchParams.id;
  return (
    <Suspense>
      <DescriptionContent 
        productIdParam={productIdFromURL}
      />
    </Suspense>
  );
}
