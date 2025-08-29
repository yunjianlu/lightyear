"use client";

import Link from "next/link";
import AddToCartButton from "../components/addToCartButton";
import Layout from "../components/Layout";
// import { products } from "./mockData";
import Image from "next/image";
import SideFilterBar from "../components/SideFilterBar";
import useSWR from "swr/immutable";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// ProductList component: Handles product fetching, filtering, and rendering
function ProductList() {
  // Get search/filter params from URL
  const searchParams = useSearchParams();

  // Extract filter values from search params
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";
  const price = searchParams.get("price") || "0";
  const rating = searchParams.get("rating") || "0";
  const inStock = searchParams.get("inStock") === "true";
  const outOfStock = searchParams.get("outOfStock") === "true";

  // SWR data fetching for products
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {
    data: products = [],
    error,
    isLoading,
  } = useSWR("/api/products", fetcher);

  // Show loading or error states
  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products.</div>;

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

  // Render product grid and filter sidebar
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 grid-flow-row">
      {/* Sidebar for product filters */}
      <div className="md:w-1/4 lg:w-1/5 bg-white">
        <SideFilterBar
          initialCategory={category}
          initialPrice={price}
          initialRating={rating}
          initialInStock={inStock}
          initialOutOfStock={outOfStock}
        />
      </div>
      {/* Render filtered product cards */}
      {filteredProducts.map((product) => (
        <div
          key={product.productId}
          className="bg-white rounded-lg shadow p-6 flex flex-col"
        >
          {/* Product image and link to details */}
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
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
          {/* Product name as link */}
          <Link href={`/product/description?id=${product.productId}`}>
            <h3 className="text-xl font-bold mb-2 text-gray-900">
              {product.productName}
            </h3>
          </Link>

          {/* Product description */}
          <p className="text-gray-800 mb-2">{product.productDescription}</p>
          {/* Vendor info */}
          <div className="text-sm text-gray-800 mb-2">
            Vendor: {product.vendor}
          </div>
          {/* Price info */}
          <div className="text-sm text-gray-800 mb-2">
            Price: ${product.price}
          </div>
          {/* Stock info and Add to Cart button */}
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
          {/* Product rating and reviews */}
          <div className="text-yellow-500 mb-2">
            Rating: {product.starRating} ⭐ ({product.numberOfReviews} reviews)
          </div>
          {/* Product tags */}
          <div className="text-xs text-gray-400 mb-2">
            Tags: {product.tags.join(", ")}
          </div>
          {/* Frequently returned info */}
          <div className="text-xs text-gray-400 mb-2">
            Frequently Returned: {product.frequentlyReturned ? "Yes" : "No"}
          </div>
          {/* Top review */}
          <div className="text-xs text-gray-400 mb-2">
            Top Review: &quot;{product.topReview}&quot;
          </div>
        </div>
      ))}
      {/* Show message if no products found */}
      {filteredProducts.length === 0 && <p>No products found.</p>}
    </div>
  );
}

// ProductPage component: Wraps ProductList with layout and suspense
export default function ProductPage() {
  return (
    <Layout>
      <Suspense>
        <ProductList />
      </Suspense>
    </Layout>
  );
}
