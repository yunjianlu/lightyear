/**
 * AddToCartButton Component
 *
 * A reusable component that provides "Add to Cart" functionality with quantity selection.
 * Features:
 * - Quantity counter with increment/decrement buttons
 * - Respects product stock limits
 * - Loading state during add to cart action
 * - Disabled state for out-of-stock items
 * - Callback support for parent components to handle cart updates
 *
 * Props:
 * - product: Object containing product details (quantityInStock, etc.)
 * - onAdd: Optional callback function called when item is added to cart
 *
 * Used in: Product listing pages, product detail views
 */
"use client";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function AddToCartButton({ product, onAdd }) {
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    setAdding(true);
    // Simulate add to cart logic
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Add to cart using context
    addToCart(product, quantity);

    setAdding(false);
    if (onAdd) onAdd({ ...product, selectedQuantity: quantity });
    // Optionally show a toast or feedback here
  };

  const incrementQuantity = () => {
    if (quantity < product.quantityInStock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Quantity Counter */}
      <div className="flex items-center border border-gray-300 rounded">
        <button
          className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          onClick={decrementQuantity}
          disabled={quantity <= 1 || product.quantityInStock === 0}
        >
          -
        </button>
        <span className="px-3 py-1 text-sm font-medium">{quantity}</span>
        <button
          className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          onClick={incrementQuantity}
          disabled={
            quantity >= product.quantityInStock || product.quantityInStock === 0
          }
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
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
    </div>
  );
}
