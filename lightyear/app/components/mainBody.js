/**
 * LandingBody Component (Main Body)
 *
 * The main content area component that displays a responsive grid of products on the home page.
 * Features:
 * - Responsive grid layout (1 column on mobile, 2 on tablet, 3 on desktop)
 * - Product cards with hover effects and interactive elements
 * - Clickable product images and titles that link to individual product pages
 * - Product information display (name, description, vendor, price, stock, rating)
 * - Integrated AddToCartButton for in-stock items
 * - Out-of-stock handling with visual indicators
 * - Optimized images using Next.js Image component
 *
 * Data Source: Imports product data from ../product/mockData
 * Used in: Home page (/) as the main content area
 * Layout: Works with SideFilterBar in a flex layout structure
 */
import AddToCartButton from "./addToCartButton";
import { products } from "../product/mockData";
import Link from "next/link";
import Image from "next/image";

export default function LandingBody() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product.productId}
          className="bg-white rounded-lg shadow p-6 flex flex-col h-full hover:shadow-lg"
        >
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
              className="w-full h-48 object-contain mb-4 rounded"
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
          <div className="text-yellow-500 mb-2">
            Rating: {product.starRating} ⭐ ({product.numberOfReviews} reviews)
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
      ))}
    </div>
  );
}
