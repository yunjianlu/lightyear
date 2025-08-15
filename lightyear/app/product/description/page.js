// // Need to change title text so it resizes based on text length. Most likely requires either changing the div size based on text length or changing the text size based on length. One requires CSS, the other JavaScript.
// // It'd be cool to add x number of stars to the rating based on the actual rating. Requires a JavaScript function.

// "use client";

// import Layout from "../../components/Layout";
// import { products } from "../mockData";
// import Image from "next/image";
// import AddToCartButton from "../../components/addToCartButton";
// import { useSearchParams, useRouter } from "next/navigation";

// export default function DetailedProductPage() {
//   const router = useRouter();
//   const productIdParam = useSearchParams().get("id");
//   let productArrayPosition = undefined;
//   let productPositionCounter = 0;
//   let starRatingCount = 1;
//   let starRatingString = "";

//   while (
//     productArrayPosition == undefined &&
//     productPositionCounter < products.length &&
//     productIdParam != undefined
//   ) {
//     if (products[productPositionCounter].productId == productIdParam) {
//       productArrayPosition = productPositionCounter;
//       break;
//     }

//     productPositionCounter++;
//   }

//   starRatingCount = Math.floor(products[productArrayPosition].starRating);
//   for (let i = 0; i < starRatingCount; i++) {
//     starRatingString += "⭐";
//   }
//   starRatingString += "\n";

//   if (productArrayPosition != undefined) {
//     return (
//       <Layout>
//         {/* Go Back Button */}
//         <div className="p-4 pt-20 sm:pt-4">
//           <button
//             onClick={() => router.back()}
//             className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
//           >
//             <svg
//               className="w-4 h-4 mr-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M10 19l-7-7m0 0l7-7m-7 7h18"
//               />
//             </svg>
//             Go Back
//           </button>
//         </div>

//         <div className="p-8 grid grid-cols-1 md:grid-cols-3 md:gap-2 grid-flow-row md:grid-flow-col md:grid-rows-[min-content_min-content] h-min">
//           <div id="leftScrollStick" className="row-span-2">
//             <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-[8rem_minmax(15rem,32rem)_auto_auto_auto] sm:grid-rows-[8rem_minmax(15rem,32rem)_auto_auto] md:grid-rows-[8rem_minmax(15rem,26rem)_auto_auto] bg-white mb-2">
//               <div className="col-span-1 sm:col-span-3 flex justify-center items-center">
//                 <h1
//                   className={
//                     products[productArrayPosition].productName.length > 19
//                       ? "wrap-normal text-wrap text-4xl md:text-5xl text-center"
//                       : "wrap-normal text-wrap text-5xl md:text-6xl text-center"
//                   }
//                 >
//                   {products[productArrayPosition].productName
//                     ? products[productArrayPosition].productName
//                     : "Unknown Name"}
//                 </h1>
//               </div>
//               <div className="col-span-1 sm:col-span-3 flex">
//                 <Image
//                   src={
//                     products[productArrayPosition].productImage
//                       ? products[productArrayPosition].productImage
//                       : "/images/products/lightsaber-blue.png"
//                   }
//                   alt={products[productArrayPosition].productName}
//                   width={400}
//                   height={192}
//                   className="w-full object-contain rounded m-4 mx-auto p-2"
//                 />
//               </div>
//               <div className="col-span-1 sm:row-span-1 flex justify-center items-center whitespace-pre-wrap">
//                 <p>
//                   {products[productArrayPosition].starRating
//                     ? products[productArrayPosition].starRating +
//                       " " +
//                       starRatingString +
//                       `(${products[productArrayPosition].numberOfReviews}) reviews`
//                     : "Unknown Rating"}
//                 </p>
//               </div>

//               <div className="col-span-1 sm:row-span-1 flex justify-center items-center">
//                 <p>
//                   Price: $
//                   {products[productArrayPosition].price
//                     ? products[productArrayPosition].price
//                     : "Unknown Rating"}
//                 </p>
//               </div>
//               <div className="col-span-1 sm:row-span-1 flex justify-center items-center">
//                 <p>Buy</p>
//               </div>
//               <div className="col-span-1 sm:col-span-3 flex justify-center items-center p-4">
//                 <AddToCartButton product={products[productArrayPosition]} />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 grid-flow-row bg-black gap-y-0.25 auto-rows-min h-min mb-2 md:mb-0">
//               <div className="col-span-2 bg-white flex items-center justify-center">
//                 <h1 className="text-2xl m-2">Statistics</h1>
//               </div>

//               <h2 className="bg-white pl-2">Quantity In Stock</h2>
//               <div className="flex justify-center bg-white">
//                 <p className="m-auto">
//                   {products[productArrayPosition].quantityInStock
//                     ? products[productArrayPosition].quantityInStock
//                     : 0}
//                 </p>
//               </div>

//               <h2 className="bg-white pl-2">Frequently Returned</h2>
//               <div className="flex justify-center bg-white">
//                 <p className="m-auto">
//                   {products[productArrayPosition].frequentlyReturned
//                     ? "Yes"
//                     : "No"}
//                 </p>
//               </div>

//               <h2 className="bg-white pl-2">Times Ordered in Past Month</h2>
//               <div className="flex justify-center bg-white">
//                 <p className="m-auto">
//                   {products[productArrayPosition].orderedQuantityPastMonth
//                     ? products[productArrayPosition].orderedQuantityPastMonth
//                     : 0}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div
//             id="rightScrollExpand"
//             className="row-span-2 md:grid-cols-2 md:col-span-2 grid md:gap-2"
//           >
//             <div className="flex bg-white min-h-40 flex-col md:col-span-2 mb-2 md:mb-0 items-center">
//               <h1 className="text-2xl col-span-2 bg-white">Description</h1>
//               <p className="mx-2 self-start">
//                 {products[productArrayPosition].productDescription
//                   ? products[productArrayPosition].productDescription

//                   "use client";

//                   import Layout from "../../components/Layout";
//                   import { products } from "../mockData";
//                   import Image from "next/image";
//                   import AddToCartButton from "../../components/addToCartButton";
//                   import { useSearchParams, useRouter } from "next/navigation";
//                   import { Suspense } from "react";

//                   "use client";

//                   import Layout from "../../components/Layout";
//                   import { products } from "../mockData";
//                   import Image from "next/image";
//                   import AddToCartButton from "../../components/addToCartButton";
//                   import { useSearchParams, useRouter } from "next/navigation";
//                   import { Suspense } from "react";

//                   function ProductDetails() {
//                     const router = useRouter();
//                     const productIdParam = useSearchParams().get("id");
//                     let productArrayPosition = undefined;
//                     let productPositionCounter = 0;
//                     let starRatingCount = 1;
//                     let starRatingString = "";

//                     while (
//                       productArrayPosition == undefined &&
//                       productPositionCounter < products.length &&
//                       productIdParam != undefined
//                     ) {
//                       if (products[productPositionCounter].productId == productIdParam) {
//                         productArrayPosition = productPositionCounter;
//                         break;
//                       }
//                       productPositionCounter++;
//                     }

//                     starRatingCount = Math.floor(products[productArrayPosition].starRating);
//                     for (let i = 0; i < starRatingCount; i++) {
//                       starRatingString += "⭐";
//                     }
//                     starRatingString += "\n";

//                     if (productArrayPosition == undefined) {
//                       return <p>Product not found.</p>;
//                     }

//                     return (
//                       <Layout>
//                         {/* Go Back Button */}
//                         <div className="p-4 pt-20 sm:pt-4">
//                           <button
//                             onClick={() => router.back()}
//                             className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
//                           >
//                             <svg
//                               className="w-4 h-4 mr-2"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                               />
//                             </svg>
//                             Go Back
//                           </button>
//                         </div>
//                         {/* Main Product Details Layout */}
//                         <div className="p-8 grid grid-cols-1 md:grid-cols-3 md:gap-2 grid-flow-row md:grid-flow-col md:grid-rows-[min-content_min-content] h-min">
//                           <div id="leftScrollStick" className="row-span-2">
//                             <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-[8rem_minmax(15rem,32rem)_auto_auto_auto] sm:grid-rows-[8rem_minmax(15rem,32rem)_auto_auto] md:grid-rows-[8rem_minmax(15rem,26rem)_auto_auto] bg-white mb-2">
//                               <div className="col-span-1 sm:col-span-3 flex justify-center items-center">
//                                 <h1
//                                   className={
//                                     products[productArrayPosition].productName.length > 19
//                                       ? "wrap-normal text-wrap text-4xl md:text-5xl text-center"
//                                       : "wrap-normal text-wrap text-5xl md:text-6xl text-center"
//                                   }
//                                 >
//                                   {products[productArrayPosition].productName || "Unknown Name"}
//                                 </h1>
//                               </div>
//                               <div className="col-span-1 sm:col-span-3 flex">
//                                 <Image
//                                   src={products[productArrayPosition].productImage || "/images/products/lightsaber-blue.png"}
//                                   alt={products[productArrayPosition].productName}
//                                   width={400}
//                                   height={192}
//                                   className="w-full object-contain rounded m-4 mx-auto p-2"
//                                 />
//                               </div>
//                               <div className="col-span-1 sm:row-span-1 flex justify-center items-center whitespace-pre-wrap">
//                                 <p>
//                                   {products[productArrayPosition].starRating
//                                     ? products[productArrayPosition].starRating + " " + starRatingString + `(${products[productArrayPosition].numberOfReviews}) reviews`
//                                     : "Unknown Rating"}
//                                 </p>
//                               </div>
//                               <div className="col-span-1 sm:row-span-1 flex justify-center items-center">
//                                 <p>
//                                   Price: $
//                                   {products[productArrayPosition].price || "Unknown Rating"}
//                                 </p>
//                               </div>
//                               <div className="col-span-1 sm:row-span-1 flex justify-center items-center">
//                                 <p>Buy</p>
//                               </div>
//                               <div className="col-span-1 sm:col-span-3 flex justify-center items-center p-4">
//                                 <AddToCartButton product={products[productArrayPosition]} />
//                               </div>
//                             </div>
//                             {/* Statistics Section */}
//                             <div className="grid grid-cols-2 grid-flow-row bg-black gap-y-0.25 auto-rows-min h-min mb-2 md:mb-0">
//                               <div className="col-span-2 bg-white flex items-center justify-center">
//                                 <h1 className="text-2xl m-2">Statistics</h1>
//                               </div>
//                               <h2 className="bg-white pl-2">Quantity In Stock</h2>
//                               <div className="flex justify-center bg-white">
//                                 <p className="m-auto">{products[productArrayPosition].quantityInStock || 0}</p>
//                               </div>
//                               <h2 className="bg-white pl-2">Frequently Returned</h2>
//                               <div className="flex justify-center bg-white">
//                                 <p className="m-auto">{products[productArrayPosition].frequentlyReturned ? "Yes" : "No"}</p>
//                               </div>
//                               <h2 className="bg-white pl-2">Times Ordered in Past Month</h2>
//                               <div className="flex justify-center bg-white">
//                                 <p className="m-auto">{products[productArrayPosition].orderedQuantityPastMonth || 0}</p>
//                               </div>
//                             </div>
//                           </div>
//                           {/* Right Section: Description, Specifications, Tags */}
//                           <div id="rightScrollExpand" className="row-span-2 md:grid-cols-2 md:col-span-2 grid md:gap-2">
//                             <div className="flex bg-white min-h-40 flex-col md:col-span-2 mb-2 md:mb-0 items-center">
//                               <h1 className="text-2xl col-span-2 bg-white">Description</h1>
//                               <p className="mx-2 self-start">
//                                 {products[productArrayPosition].productDescription || "No description available"}
//                               </p>
//                             </div>
//                             <div className="grid grid-flow-row bg-black grid-cols-2 gap-y-0.25 auto-rows-min h-min mb-2 md:mb-0 md:col-span-1">
//                               <div className="col-span-2 bg-white flex items-center justify-center">
//                                 <h1 className="text-2xl m-2">Specifications</h1>
//                               </div>
//                               <h2 className="bg-white pl-2">Product ID</h2>
//                               <div className="flex justify-center bg-white">
//                                 <p>{products[productArrayPosition].productId || "No product ID available"}</p>
//                               </div>
//                               <h2 className="bg-white pl-2">Vendor</h2>
//                               <div className="flex justify-center bg-white">
//                                 <p>{products[productArrayPosition].vendor || "Unknown"}</p>
//                               </div>
//                               <h2 className="bg-white pl-2">Dimensions</h2>
//                               <div className="flex justify-center bg-white">
//                                 <p>{products[productArrayPosition].productDetails.dimensions || "Unknown"}</p>
//                               </div>
//                               <h2 className="bg-white pl-2">Color</h2>
//                               <div className="flex justify-center bg-white">
//                                 <p>{products[productArrayPosition].productDetails.color || "Unknown"}</p>
//                               </div>
//                               <h2 className="bg-white pl-2">Material</h2>
//                               <div className="flex justify-center bg-white">
//                                 <p>{products[productArrayPosition].productDetails.material || "Unknown"}</p>
//                               </div>
//                               <h2 className="bg-white pl-2">Weight</h2>
//                               <div className="flex justify-center bg-white">
//                                 <p>{products[productArrayPosition].productDetails.weight || "Unknown"}</p>
//                               </div>
//                               <h2 className="bg-white pl-2">Place of Origin</h2>
//                               <div className="flex justify-center bg-white">
//                                 <p>{products[productArrayPosition].productDetails.originLocation || "Unknown"}</p>
//                               </div>
//                               <h2 className="bg-white pl-2">Batteries Included</h2>
//                               <div className="flex justify-center bg-white">
//                                 <p>{products[productArrayPosition].productDetails.batteriesIncluded || "Unknown"}</p>
//                               </div>
//                               <h2 className="bg-white pl-2">Grogu Approved?</h2>
//                               <div className="flex justify-center bg-white">
//                                 <p>{products[productArrayPosition].productDetails.groguApproved ? products[productArrayPosition].productDetails.groguApproved : "No"}</p>
//                               </div>
//                             </div>
//                             <div className="flex bg-white min-h-18 flex-col h-min md:col-span-1 flex-wrap">
//                               <h1 className="text-2xl bg-white mx-auto mt-2">Tags</h1>
//                               <div className="flex flex-row flex-wrap px-1 py-1">
//                                 {products[productArrayPosition].tags.map((tag) => (
//                                   <div className="m-1 p-1 bg-blue-400" key={tag}>
//                                     <p>{tag}</p>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </Layout>
//                     );
//                   }

//                   export default function DetailedProductPage() {
//                     return (
//                       <Suspense fallback={<div>Loading...</div>}>
//                         <ProductDetails />
//                       </Suspense>
//                     );
//                   }
//                     : "Unknown"}
//                 </p>
//               </div>

//               <h2 className="bg-white pl-2">Batteries Included</h2>
//               <div className="flex justify-center bg-white">
//                 <p>
//                   {products[productArrayPosition].productDetails
//                     .batteriesIncluded
//                     ? products[productArrayPosition].productDetails
//                         .batteriesIncluded
//                     : "Unknown"}
//                 </p>
//               </div>

//               <h2 className="bg-white pl-2">Grogu Approved?</h2>
//               <div className="flex justify-center bg-white">
//                 <p>
//                   {products[productArrayPosition].productDetails.groguApproved
//                     ? products[productArrayPosition].productDetails
//                         .groguApproved
//                     : "No"}
//                 </p>
//               </div>
//             </div>

//             <div className="flex bg-white min-h-18 flex-col h-min md:col-span-1 flex-wrap">
//               <h1 className="text-2xl bg-white mx-auto mt-2">Tags</h1>
//               <div className="flex flex-row flex-wrap px-1 py-1">
//                 {products[productArrayPosition].tags.map((tag) => {
//                   return (
//                     <div className="m-1 p-1 bg-blue-400" key={tag}>
//                       <p>{tag}</p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     );
//   } else {
//     return <p>hi</p>;
//   }
// }

"use client";

import Layout from "../../components/Layout";
import { products } from "../mockData";
import Image from "next/image";
import AddToCartButton from "../../components/addToCartButton";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function ProductDetails() {
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

  if (productArrayPosition == undefined) {
    return <p>Product not found.</p>;
  }

  starRatingCount = Math.floor(products[productArrayPosition].starRating);
  for (let i = 0; i < starRatingCount; i++) {
    starRatingString += "⭐";
  }
  starRatingString += "\n";

  return (
    <Layout>
      {/* Go Back Button */}
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
      {/* Main Product Details Layout */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 md:gap-2 grid-flow-row md:grid-flow-col md:grid-rows-[min-content_min-content] h-min">
        <div id="leftScrollStick" className="row-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-[8rem_minmax(15rem,32rem)_auto_auto_auto] sm:grid-rows-[8rem_minmax(15rem,32rem)_auto_auto] md:grid-rows-[8rem_minmax(15rem,26rem)_auto_auto] bg-white mb-2">
            <div className="col-span-1 sm:col-span-3 flex justify-center items-center">
              <h1
                className={
                  products[productArrayPosition].productName.length > 19
                    ? "wrap-normal text-wrap text-4xl md:text-5xl text-center"
                    : "wrap-normal text-wrap text-5xl md:text-6xl text-center"
                }
              >
                {products[productArrayPosition].productName || "Unknown Name"}
              </h1>
            </div>
            <div className="col-span-1 sm:col-span-3 flex">
              <Image
                src={
                  products[productArrayPosition].productImage ||
                  "/images/products/lightsaber-blue.png"
                }
                alt={products[productArrayPosition].productName}
                width={400}
                height={192}
                className="w-full object-contain rounded m-4 mx-auto p-2"
              />
            </div>
            <div className="col-span-1 sm:row-span-1 flex justify-center items-center whitespace-pre-wrap">
              <p>
                {products[productArrayPosition].starRating
                  ? products[productArrayPosition].starRating +
                    " " +
                    starRatingString +
                    `(${products[productArrayPosition].numberOfReviews}) reviews`
                  : "Unknown Rating"}
              </p>
            </div>
            <div className="col-span-1 sm:row-span-1 flex justify-center items-center">
              <p>
                Price: $
                {products[productArrayPosition].price || "Unknown Rating"}
              </p>
            </div>
            <div className="col-span-1 sm:row-span-1 flex justify-center items-center">
              <p>Buy</p>
            </div>
            <div className="col-span-1 sm:col-span-3 flex justify-center items-center p-4">
              <AddToCartButton product={products[productArrayPosition]} />
            </div>
          </div>
          {/* Statistics Section */}
          <div className="grid grid-cols-2 grid-flow-row bg-black gap-y-0.25 auto-rows-min h-min mb-2 md:mb-0">
            <div className="col-span-2 bg-white flex items-center justify-center">
              <h1 className="text-2xl m-2">Statistics</h1>
            </div>
            <h2 className="bg-white pl-2">Quantity In Stock</h2>
            <div className="flex justify-center bg-white">
              <p className="m-auto">
                {products[productArrayPosition].quantityInStock || 0}
              </p>
            </div>
            <h2 className="bg-white pl-2">Frequently Returned</h2>
            <div className="flex justify-center bg-white">
              <p className="m-auto">
                {products[productArrayPosition].frequentlyReturned
                  ? "Yes"
                  : "No"}
              </p>
            </div>
            <h2 className="bg-white pl-2">Times Ordered in Past Month</h2>
            <div className="flex justify-center bg-white">
              <p className="m-auto">
                {products[productArrayPosition].orderedQuantityPastMonth || 0}
              </p>
            </div>
          </div>
        </div>
        {/* Right Section: Description, Specifications, Tags */}
        <div
          id="rightScrollExpand"
          className="row-span-2 md:grid-cols-2 md:col-span-2 grid md:gap-2"
        >
          <div className="flex bg-white min-h-40 flex-col md:col-span-2 mb-2 md:mb-0 items-center">
            <h1 className="text-2xl col-span-2 bg-white">Description</h1>
            <p className="mx-2 self-start">
              {products[productArrayPosition].productDescription ||
                "No description available"}
            </p>
          </div>
          <div className="grid grid-flow-row bg-black grid-cols-2 gap-y-0.25 auto-rows-min h-min mb-2 md:mb-0 md:col-span-1">
            <div className="col-span-2 bg-white flex items-center justify-center">
              <h1 className="text-2xl m-2">Specifications</h1>
            </div>
            <h2 className="bg-white pl-2">Product ID</h2>
            <div className="flex justify-center bg-white">
              <p>
                {products[productArrayPosition].productId ||
                  "No product ID available"}
              </p>
            </div>
            <h2 className="bg-white pl-2">Vendor</h2>
            <div className="flex justify-center bg-white">
              <p>{products[productArrayPosition].vendor || "Unknown"}</p>
            </div>
            <h2 className="bg-white pl-2">Dimensions</h2>
            <div className="flex justify-center bg-white">
              <p>
                {products[productArrayPosition].productDetails.dimensions ||
                  "Unknown"}
              </p>
            </div>
            <h2 className="bg-white pl-2">Color</h2>
            <div className="flex justify-center bg-white">
              <p>
                {products[productArrayPosition].productDetails.color ||
                  "Unknown"}
              </p>
            </div>
            <h2 className="bg-white pl-2">Material</h2>
            <div className="flex justify-center bg-white">
              <p>
                {products[productArrayPosition].productDetails.material ||
                  "Unknown"}
              </p>
            </div>
            <h2 className="bg-white pl-2">Weight</h2>
            <div className="flex justify-center bg-white">
              <p>
                {products[productArrayPosition].productDetails.weight ||
                  "Unknown"}
              </p>
            </div>
            <h2 className="bg-white pl-2">Place of Origin</h2>
            <div className="flex justify-center bg-white">
              <p>
                {products[productArrayPosition].productDetails.originLocation ||
                  "Unknown"}
              </p>
            </div>
            <h2 className="bg-white pl-2">Batteries Included</h2>
            <div className="flex justify-center bg-white">
              <p>
                {products[productArrayPosition].productDetails
                  .batteriesIncluded || "Unknown"}
              </p>
            </div>
            <h2 className="bg-white pl-2">Grogu Approved?</h2>
            <div className="flex justify-center bg-white">
              <p>
                {products[productArrayPosition].productDetails.groguApproved
                  ? products[productArrayPosition].productDetails.groguApproved
                  : "No"}
              </p>
            </div>
          </div>
          <div className="flex bg-white min-h-18 flex-col h-min md:col-span-1 flex-wrap">
            <h1 className="text-2xl bg-white mx-auto mt-2">Tags</h1>
            <div className="flex flex-row flex-wrap px-1 py-1">
              {products[productArrayPosition].tags.map((tag) => (
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
}

export default function DetailedProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails />
    </Suspense>
  );
}
