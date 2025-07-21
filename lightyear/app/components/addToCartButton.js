"use client";
import { useState } from "react";

export default function AddToCartButton({ product, onAdd }) {
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    // Simulate add to cart logic (replace with your own logic or API call)
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAdding(false);
    if (onAdd) onAdd(product);
    // Optionally show a toast or feedback here
  };

  return (
    <button
      className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 disabled:opacity-50"
      onClick={handleAddToCart}
      disabled={adding || product.quantityInStock === 0}
    >
      {product.quantityInStock === 0
        ? "Out of Stock"
        : adding
        ? "Adding..."
        : "Add to Cart"}
    </button>
  );
}
