/**
 * LandingBody Component (Main Body)
 *
 * The main content area component that displays a responsive grid of products on the home page.
 * Features:
 * - Responsive grid layout (1 column on mobile, 2 on tablet, 3 on desktop)
 * - Product cards with hover effects and interactive elements
 * - Clickable product images and titles that link to individual product pages
 * - Product information display (name, description, vendor, price, stock, rating)
 * Data Source: Fetched from /api/products using SWR
 */
"use client";
import AddToCartButton from "./addToCartButton";
import useSWR from "swr/immutable";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LandingBody() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.name || data.firstName || "");
      });
  }, []);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {
    data: products = [],
    error,
    isLoading,
  } = useSWR("/api/products", fetcher);

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products.</div>;

  return (
    <div className="p-8">
      {/* Welcome message - visible only if userName is available */}
      {userName && (
        <div className="w-full text-center text-sm font-medium text-gray-700 bg-gray-50 py-2 mb-2">
          Welcome, {userName}!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.productId}
            className="bg-white rounded-lg shadow p-6 flex flex-col h-full hover:shadow-lg"
          >
            {/* Clickable product image and title that navigate to product details */}
            <Link
              href={`/product/description?id=${product.productId}`}
              className="block hover:scale-105 transition-transform duration-200"
            >
              <Image
                src={
                  product.productImage
                    ? product.productImage
                    : "/images/products/lightsaber-blue.png"
                }
                alt={product.productName}
                width={400}
                height={192}
                className="w-full object-contain mb-4 rounded"
                style={{ height: "auto" }}
              />
              <h3 className="text-xl font-bold mb-2 hover:text-blue-600">
                {product.productName}
              </h3>
            </Link>
            <p className="text-gray-600 mb-2">{product.productDescription}</p>
            <div className="text-sm text-gray-500 mb-2">
              Vendor: {product.vendor}
            </div>
            <div className="text-sm text-gray-500 mb-2">
              Price: ${product.price}
            </div>
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
            <div className="flex items-center mb-2">
              <span className="text-sm text-gray-600 mr-2">Rating:</span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => {
                  const rating = parseFloat(product.starRating);
                  const difference = rating - star;
                  if (difference >= 0) {
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
              </div>
              <span className="ml-2 text-xs text-gray-500">
                ({product.numberOfReviews} reviews)
              </span>
            </div>
            <div className="text-xs text-gray-400 mb-2">
              Tags: {product.tags.join(", ")}
            </div>
            <div className="text-xs text-gray-400 mb-2">
              Frequently Returned: {product.frequentlyReturned ? "Yes" : "No"}
            </div>
            <div className="text-xs text-gray-400 mb-2">
              Top Review: &quot;{product.topReview}&quot;
            </div>
          </div>
        ))}
        {products.length === 0 && <p>No products found.</p>}
      </div>
    </div>
  );
}
