import AddToCartButton from "../components/addToCartButton";
import { products } from "../product/mockData";

import Image from "next/image";

export default function LandingBody() {
  return (
    <landingBody>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.productId}
            className="bg-white rounded-lg shadow p-6 flex flex-col"
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
            <h3 className="text-xl font-bold mb-2">{product.productName}</h3>
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
      </div>
    </landingBody>
  );
}
