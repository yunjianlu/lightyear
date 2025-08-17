"use client";

import Layout from "../../components/Layout";
import { products } from "../mockData";
import Image from "next/image";
import AddToCartButton from "../../components/addToCartButton";
import { useSearchParams, useRouter } from "next/navigation";

import { Suspense } from "react";

function DescriptionContent() {
  const router = useRouter();
  const productIdParam = useSearchParams().get("id");
  let productArrayPosition = undefined;
  let productPositionCounter = 0;
  let starRatingCount = 1;
  let starRatingString = "";

  while (
    productArrayPosition == undefined &&
    productPositionCounter < products.length &&
    productIdParam != undefined
  ) {
    if (products[productPositionCounter].productId == productIdParam) {
      productArrayPosition = productPositionCounter;
      break;
    }
    productPositionCounter++;
  }

  starRatingCount =
    productArrayPosition !== undefined
      ? Math.floor(products[productArrayPosition].starRating)
      : 0;
  for (let i = 0; i < starRatingCount; i++) {
    starRatingString += "⭐";
  }
  starRatingString += "\n";

  if (productArrayPosition != undefined) {
    const product = products[productArrayPosition];
    return (
      <Layout>
        <div className="p-4 pt-20 sm:pt-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </button>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 md:gap-2 grid-flow-row md:grid-flow-col md:grid-rows-[min-content_min-content] h-min">
          <div id="leftScrollStick" className="row-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-[8rem_minmax(15rem,32rem)_auto_auto_auto] sm:grid-rows-[8rem_minmax(15rem,32rem)_auto_auto] md:grid-rows-[8rem_minmax(15rem,26rem)_auto_auto] bg-white mb-2">
              <div className="col-span-1 sm:col-span-3 flex justify-center items-center">
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
              <div className="col-span-1 sm:col-span-3 flex">
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
              <div className="col-span-1 sm:row-span-1 flex justify-center items-center whitespace-pre-wrap">
                <p className="text-gray-800">
                  {product.starRating
                    ? product.starRating +
                      " " +
                      starRatingString +
                      `(${product.numberOfReviews}) reviews`
                    : "Unknown Rating"}
                </p>
              </div>
              <div className="col-span-1 sm:row-span-1 flex justify-center items-center">
                <p className="text-gray-800">
                  Price: ${product.price || "Unknown Rating"}
                </p>
              </div>
              <div className="col-span-1 sm:row-span-1 flex justify-center items-center">
                <p className="text-gray-800">Buy</p>
              </div>
              <div className="col-span-1 sm:col-span-3 flex justify-center items-center p-4">
                <AddToCartButton product={product} />
              </div>
            </div>

            <div className="grid grid-cols-2 grid-flow-row bg-black gap-y-0.25 auto-rows-min h-min mb-2 md:mb-0">
              <div className="col-span-2 bg-white flex items-center justify-center">
                <h1 className="text-2xl m-2 text-gray-900">Statistics</h1>
              </div>
              <h2 className="bg-white pl-2 text-gray-800">Quantity In Stock</h2>
              <div className="flex justify-center bg-white">
                <p className="m-auto">{product.quantityInStock || 0}</p>
              </div>
              <h2 className="bg-white pl-2 text-gray-800">
                Frequently Returned
              </h2>
              <div className="flex justify-center bg-white">
                <p className="m-auto">
                  {product.frequentlyReturned ? "Yes" : "No"}
                </p>
              </div>
              <h2 className="bg-white pl-2 text-gray-800">
                Times Ordered in Past Month
              </h2>
              <div className="flex justify-center bg-white">
                <p className="m-auto">
                  {product.orderedQuantityPastMonth || 0}
                </p>
              </div>
            </div>
          </div>

          <div
            id="rightScrollExpand"
            className="row-span-2 md:grid-cols-2 md:col-span-2 grid md:gap-2"
          >
            <div className="flex bg-white min-h-40 flex-col md:col-span-2 mb-2 md:mb-0 items-center">
              <h1 className="text-2xl col-span-2 bg-white text-gray-900">
                Description
              </h1>
              <p className="mx-2 self-start text-gray-800">
                {product.productDescription || "No description available"}
              </p>
            </div>
            <div className="grid grid-flow-row bg-black grid-cols-2 gap-y-0.25 auto-rows-min h-min mb-2 md:mb-0 md:col-span-1">
              <div className="col-span-2 bg-white flex items-center justify-center">
                <h1 className="text-2xl m-2 text-gray-900">Specifications</h1>
              </div>
              <h2 className="bg-white pl-2 text-gray-800">Product ID</h2>
              <div className="flex justify-center bg-white">
                <p>{product.productId || "No product ID available"}</p>
              </div>
              <h2 className="bg-white pl-2 text-gray-800">Vendor</h2>
              <div className="flex justify-center bg-white">
                <p>{product.vendor || "Unknown"}</p>
              </div>
              <h2 className="bg-white pl-2 text-gray-800">Dimensions</h2>
              <div className="flex justify-center bg-white">
                <p>{product.productDetails?.dimensions || "Unknown"}</p>
              </div>
              <h2 className="bg-white pl-2 text-gray-800">Color</h2>
              <div className="flex justify-center bg-white">
                <p>{product.productDetails?.color || "Unknown"}</p>
              </div>
              <h2 className="bg-white pl-2 text-gray-800">Material</h2>
              <div className="flex justify-center bg-white">
                <p>{product.productDetails?.material || "Unknown"}</p>
              </div>
              <h2 className="bg-white pl-2 text-gray-800">Weight</h2>
              <div className="flex justify-center bg-white">
                <p>{product.productDetails?.weight || "Unknown"}</p>
              </div>
              <h2 className="bg-white pl-2 text-gray-800">Place of Origin</h2>
              <div className="flex justify-center bg-white">
                <p>{product.productDetails?.originLocation || "Unknown"}</p>
              </div>
              <h2 className="bg-white pl-2 text-gray-800">
                Batteries Included
              </h2>
              <div className="flex justify-center bg-white">
                <p>{product.productDetails?.batteriesIncluded || "Unknown"}</p>
              </div>
              <h2 className="bg-white pl-2 text-gray-800">Grogu Approved?</h2>
              <div className="flex justify-center bg-white">
                <p>{product.productDetails?.groguApproved ? "Yes" : "No"}</p>
              </div>
            </div>
            <div className="flex bg-white min-h-18 flex-col h-min md:col-span-1 flex-wrap">
              <h1 className="text-2xl bg-white mx-auto mt-2 text-gray-900">
                Tags
              </h1>
              <div className="flex flex-row flex-wrap px-1 py-1">
                {product.tags.map((tag) => (
                  <div className="m-1 p-1 bg-blue-400" key={tag}>
                    <p>{tag}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <p>The product you are looking for does not exist.</p>
        </div>
      </Layout>
    );
  }
}

export default function DetailedProductPage() {
  return (
    <Suspense>
      <DescriptionContent />
    </Suspense>
  );
}
