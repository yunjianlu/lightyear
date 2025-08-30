import Link from "next/link";
import AddToCartButton from "../components/addToCartButton";
import Layout from "../components/Layout";
// import { products } from "./mockData";
import Image from "next/image";
import SideFilterBar from "../components/SideFilterBar";
import { queryMongoDatabase } from "../mongoDBConnection/queryMongoDB";
import useSWR from "swr/immutable";

import { Suspense } from "react";

export async function ProductList({productSearchParams}) {
  //const searchParams = useSearchParams();

  console.log("current query")
  console.log(productSearchQuery);
  let products = await queryMongoDatabase(productSearchQuery);
  console.log(products);


  // const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  // const category = searchParams.get("category") || "";
  // const price = searchParams.get("price") || "0";
  // const rating = searchParams.get("rating") || "0";
  // const inStock = searchParams.get("inStock") === "true";
  // const outOfStock = searchParams.get("outOfStock") === "true";

  // SWR data fetching for products
  // const fetcher = (url) => fetch(url).then((res) => res.json());
  // const {
  //   data: products = [],
  //   error,
  //   isLoading,
  // } = useSWR("/api/products", fetcher);

  // // Show loading or error states
  // if (isLoading) return <div>Loading products...</div>;
  // if (error) return <div>Error loading products.</div>;

  // Filter products based on search, category, price, rating, and stock
  const filteredProducts = products.filter((product) => {
    // Search filter: matches name, description, or tags
    const matchesSearch =
      !searchTerm ||
      product.productName?.toLowerCase().includes(searchTerm) ||
      product.productDescription?.toLowerCase().includes(searchTerm) ||
      (product.tags &&
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm)));

    // Category filter
    const matchesCategory =
      !category || category === "All" || product.category === category;

    // Price filter
    const matchesPrice = price === "0" || product.price <= parseInt(price);

    // Rating filter
    const matchesRating =
      rating === "0" || product.starRating >= parseInt(rating);

    // Stock filter
    const matchesStock =
      (inStock && product.quantityInStock > 0) ||
      (outOfStock && product.quantityInStock === 0) ||
      (!inStock && !outOfStock);

    // Return true if all filters match
    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesRating &&
      matchesStock
    );
  });

  return (
    //<div className="p-8 pt-12 md:p-0 flex flex-col grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 grid-flow-row">
    <div className="pt-12 md:p-0 flex flex-row">
      <div className="md:w-1/4 lg:w-1/5 bg-white">
      <SideFilterBar 
        initialCategory={productSearchParams.category}
        initialPrice={productSearchParams.price}
        initialRating={productSearchParams.rating}
        initialInStock={productSearchParams.inStock}
        initialOutOfStock={productSearchParams.outOfStock}
        />
      </div>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:w-3/4 lg:w-4/5">
      {products.map((product) => {
        product._id = product._id.toString();
        return (
        <div
          key={product.productId}
          className="bg-white rounded-lg shadow p-6 flex flex-col h-full hover:shadow-lg"
        >
          {/* Clickable product image and title that navigate to product details */}
          <Link
            href={`/product/description?id=${product.productId}`}
            className="block hover:scale-105 transition-transform duration-200 flex flex-col"
          >
            <Image
              src={
                product.productImage
                  ? product.productImage
                  : "/images/products/lightsaber-blue.png"
              }
              alt={product.productName}
              width={348}
              height={348}
              className="w-full object-contain mb-4 rounded md:size-auto aspect-square items-center"
            />
            <h3 className="text-xl font-bold mb-2 hover:text-blue-600">
              {product.productName}
            </h3>
          </Link>
          {/* Product description text */}
          <p className="text-gray-600 mb-2">{product.productDescription}</p>
          {/* Vendor information display */}
          <div className="text-sm text-gray-500 mb-2">
            Vendor: {product.vendor}
          </div>
          {/* Product price display */}
          <div className="text-sm text-gray-500 mb-2">
            Price: ${product.price}
          </div>
          {/* Stock quantity with Add to Cart button or out-of-stock message */}
          <div className="text-sm text-gray-500 mb-2">
            Stock:{" "}
            {product.quantityInStock > 0 ? (
              <>
                {product.quantityInStock}
                <div className="mt-2">
                  <AddToCartButton product={product} />
                </div>
              </>
            ) : (
              <span className="font-bold text-red-400">Out of stock</span>
            )}
          </div>
          {/* Dynamic star rating display with full, half, and empty stars */}
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-600 mr-2">Rating:</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => {
                const rating = parseFloat(product.starRating);
                const difference = rating - star;

                if (difference >= 0) {
                  // Full star
                  return (
                    <svg
                      key={star}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  );
                } else if (difference > -1) {
                  // Half star
                  return (
                    <div key={star} className="relative w-4 h-4">
                      <svg
                        className="absolute w-4 h-4 text-gray-300 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <div className="absolute inset-0 overflow-hidden w-1/2">
                        <svg
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                  );
                } else {
                  // Empty star
                  return (
                    <svg
                      key={star}
                      className="w-4 h-4 text-gray-300 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  );
                }
              })}
              <span className="text-sm text-gray-600 ml-2">
                {product.starRating} ({product.numberOfReviews} reviews)
              </span>
            </div>
          </div>
          {/* <div className="text-xs text-gray-400 mb-2">
            Tags: {product.tags.join(", ")}
          </div> */}
          {/* <div className="text-xs text-gray-400 mb-2">
            Frequently Returned: {product.frequentlyReturned ? "Yes" : "No"}
          </div>
          <div className="text-xs text-gray-400 mb-2">
            Top Review: &quot;{product.topReview}&quot;
          </div> */}
        </div>
      )})}
    </div>
      {products.length === 0 && <p>No products found.</p>}
    </div>
  );
}

export default async function ProductPage({ searchParams }) {
  let fetchedSearchParams = await searchParams;
  return (
    <Layout>
      <Suspense>
        <ProductList 
        productSearchParams={fetchedSearchParams}
        />
      </Suspense>
    </Layout>
  );
}

{/* <div className="w-full md:w-3/4 lg:w-4/5 grid grid-cols-1 p-8 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => {
        product._id = product._id.toString();
        return (
          <div
            key={product.productId}
            className="bg-white rounded-lg shadow p-6 flex flex-col"
          >
            <Link href={`/product/description?id=${product.productId}`}>
              <Image
                src={
                  product.productImage
                    ? product.productImage
                    : "/lightyear/images/products/lightsaber-blue.png"
                }
                alt={product.productName}
                width={400}
                height={192}
                className="w-full h-48 object-contain mb-4 rounded"
              />
            </Link>
            <Link href={`/product/description?id=${product.productId}`}>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {product.productName}
              </h3>
            </Link>

            <p className="text-gray-800 mb-2">{product.productDescription}</p>
            <div className="text-sm text-gray-800 mb-2">
              Vendor: {product.vendor}
            </div>
            <div className="text-sm text-gray-800 mb-2">
              Price: ${product.price}
            </div>
            <div className="text-sm text-gray-800 mb-2">
              Stock:{" "}
              {product.quantityInStock > 0 ? (
                <>
                  {product.quantityInStock}
                  <div className="mt-2">
                    <AddToCartButton product={product} />
                  </div>
                </>
              ) : (
                <span className="font-bold text-red-400">Out of stock</span>
              )}
            </div>
            <div className="text-yellow-500 mb-2">
              Rating: {product.starRating} ⭐ ({product.numberOfReviews} reviews)
            </div>
            {/* <div className="text-xs text-gray-400 mb-2">
              Tags: {product.tags.join(", ")}
            </div>
            <div className="text-xs text-gray-400 mb-2">
              Frequently Returned: {product.frequentlyReturned ? "Yes" : "No"}
            </div>
            <div className="text-xs text-gray-400 mb-2">
              Top Review: &quot;{product.topReview}&quot;
            </div> }
          </div>
        )})}
      </div> */}
