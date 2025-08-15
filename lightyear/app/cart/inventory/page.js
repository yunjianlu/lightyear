"use client";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import Layout from "../../components/Layout";
import { products } from "../../product/mockData";
import Image from "next/image";

export default function CartInventoryPage() {
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, inCart, notInCart

  // Filter products based on search and filter type
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const isInCart = cartItems.some(
      (item) => item.productId === product.productId
    );

    let matchesFilter = true;
    if (filterType === "inCart") {
      matchesFilter = isInCart;
    } else if (filterType === "notInCart") {
      matchesFilter = !isInCart;
    }

    return matchesSearch && matchesFilter;
  });

  const getCartQuantity = (productId) => {
    const cartItem = cartItems.find((item) => item.productId === productId);
    return cartItem ? cartItem.selectedQuantity : 0;
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Cart Inventory Management
            </h1>
            <p className="text-gray-600">
              Manage your cart items and explore available products
            </p>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div>
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Search Products
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, vendor, or tags..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Filter */}
              <div>
                <label
                  htmlFor="filter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Filter Products
                </label>
                <select
                  id="filter"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                >
                  <option value="all">All Products</option>
                  <option value="inCart">Items in Cart</option>
                  <option value="notInCart">Items not in Cart</option>
                </select>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {cartItems.length}
                  </p>
                  <p className="text-sm text-gray-500">Items in Cart</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {cartItems.reduce(
                      (total, item) => total + item.selectedQuantity,
                      0
                    )}
                  </p>
                  <p className="text-sm text-gray-500">Total Quantity</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    $
                    {cartItems
                      .reduce(
                        (total, item) =>
                          total + item.price * item.selectedQuantity,
                        0
                      )
                      .toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">Total Value</p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const cartQuantity = getCartQuantity(product.productId);
              const isInCart = cartQuantity > 0;

              return (
                <div
                  key={product.productId}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={
                        product.productImage ||
                        "/lightyear/images/products/lightsaber-blue.png"
                      }
                      alt={product.productName}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    {isInCart && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        In Cart ({cartQuantity})
                      </div>
                    )}
                    {product.quantityInStock === 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.productName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {product.vendor}
                    </p>
                    <p className="text-lg font-bold text-red-600 mb-2">
                      ${product.price.toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>Stock: {product.quantityInStock}</span>
                      <span>Rating: {product.starRating}⭐</span>
                    </div>

                    {/* Cart Controls */}
                    <div className="space-y-2">
                      {!isInCart ? (
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.quantityInStock === 0}
                          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                          {product.quantityInStock === 0
                            ? "Out of Stock"
                            : "Add to Cart"}
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">
                              Quantity in cart:
                            </span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    product.productId,
                                    cartQuantity - 1
                                  )
                                }
                                className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 flex items-center justify-center"
                              >
                                -
                              </button>
                              <span className="font-semibold">
                                {cartQuantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    product.productId,
                                    cartQuantity + 1
                                  )
                                }
                                disabled={
                                  cartQuantity >= product.quantityInStock
                                }
                                className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(product.productId)}
                            className="w-full bg-red-100 text-red-600 py-2 px-4 rounded-md hover:bg-red-200 transition-colors"
                          >
                            Remove from Cart
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Product Tags */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {product.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {product.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{product.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-12 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => (window.location.href = "/cart")}
                className="bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                View Cart ({cartItems.length} items)
              </button>
              <button
                onClick={() => (window.location.href = "/product")}
                className="bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Browse All Products
              </button>
              <button
                onClick={() => setFilterType("inCart")}
                className="bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors"
              >
                Show Cart Items Only
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
