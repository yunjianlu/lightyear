"use client";

import Link from "next/link";
import AddToCartButton from "../components/addToCartButton";
import Layout from "../components/Layout";
// import { products } from "./mockData";
import { products } from "./mockData";
import Image from "next/image";
import SideFilterBar from "../components/SideFilterBar";

import { useSearchParams } from "next/navigation";

export default function ProductPage() {
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";
  const price = searchParams.get("price") || "0";
  const rating = searchParams.get("rating") || "0";
  const inStock = searchParams.get("inStock") === "true";
  const outOfStock = searchParams.get("outOfStock") === "true";
  // ? is optional chaining to handle null/undefined

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !searchTerm ||
      product.productName.toLowerCase().includes(searchTerm) ||
      product.productDescription.toLowerCase().includes(searchTerm) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchTerm));

    const matchesCategory =
      !category || category === "All" || product.category === category;

    const matchesPrice = price === "0" || product.price <= parseInt(price);

    const matchesRating =
      rating === "0" || product.starRating >= parseInt(rating);

    const matchesStock =
      (inStock && product.quantityInStock > 0) ||
      (outOfStock && product.quantityInStock === 0) ||
      (!inStock && !outOfStock);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesRating &&
      matchesStock
    );
  });

  return (
    <Layout>
      {/* Sidebar container: holds the filter bar, takes 1/4 or 1/5 width on md/lg */}
      {/* <div className=" md:w-1/4 lg:w-1/5 bg-white">
        <SideFilterBar />
      </div> */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 grid-flow-row bg-[url(/lightyear/images/about/largerNightSky_pic.png)]">
        {filteredProducts.map((product) => (
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
              <h3 className="text-xl font-bold mb-2">{product.productName}</h3>
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
              Rating: {product.starRating} ⭐ ({product.numberOfReviews}{" "}
              reviews)
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
        {filteredProducts.length === 0 && <p>No products found.</p>}
      </div>
    </Layout>
  );
}
