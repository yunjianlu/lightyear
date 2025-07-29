"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../contexts/CartContext";
import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();

  // Mock user for demonstration - in real app this would come from auth context
  const mockUser = {
    name: "John Doe",
    role: "vendor", // Change this to "customer", "admin", or "vendor" to test
    email: "john@example.com",
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Start shopping to add items to your cart
            </p>
            <button
              onClick={() => router.push("/product")}
              className="bg-red-600 border border-transparent rounded-md shadow-sm py-3 px-6 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </Layout>
    );
  }

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

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Shopping Cart
          </h1>

          {/* Debug info - remove this after testing */}
          <div className="mb-4 p-2 bg-yellow-100 border border-yellow-400 rounded text-sm">
            Debug: User: {mockUser.name} | Role: {mockUser.role}
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            {/* Cart Items */}
            <section className="lg:col-span-7">
              <div className="bg-white rounded-lg shadow">
                <div className="px-4 py-6 sm:px-6">
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <li key={item.productId} className="py-6 flex">
                          <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                            <Image
                              src={
                                item.productImage ||
                                "/images/products/lightsaber-blue.png"
                              }
                              alt={item.productName}
                              width={96}
                              height={96}
                              className="w-full h-full object-center object-cover"
                            />
                          </div>

                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.productName}</h3>
                                <p className="ml-4">${item.price.toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.vendor}
                              </p>
                            </div>
                            <div className="flex-1 flex items-end justify-between text-sm">
                              <div className="flex items-center">
                                <label
                                  htmlFor={`quantity-${item.productId}`}
                                  className="sr-only"
                                >
                                  Quantity
                                </label>
                                <div className="flex items-center border border-gray-300 rounded">
                                  <button
                                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.productId,
                                        item.selectedQuantity - 1
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                  <span className="px-3 py-1 text-sm font-medium">
                                    {item.selectedQuantity}
                                  </span>
                                  <button
                                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.productId,
                                        item.selectedQuantity + 1
                                      )
                                    }
                                    disabled={
                                      item.selectedQuantity >=
                                      item.quantityInStock
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                                <p className="ml-4 text-gray-500">
                                  $
                                  {(item.price * item.selectedQuantity).toFixed(
                                    2
                                  )}
                                </p>
                              </div>

                              <div className="flex">
                                <button
                                  type="button"
                                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                  onClick={() => removeFromCart(item.productId)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between">
                    <button
                      onClick={clearCart}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={() => router.push("/product")}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Order Summary */}
            <section className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
              <h2 className="text-lg font-medium text-gray-900">
                Cart Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Items in cart</p>
                  <p className="text-sm font-medium text-gray-900">
                    {cartItems.reduce(
                      (total, item) => total + item.selectedQuantity,
                      0
                    )}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <p className="text-base font-medium text-gray-900">
                    Subtotal
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    ${getCartTotal().toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/cart/checkout">
                  <button className="w-full bg-red-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500 transition-colors">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>

              <div className="mt-6 text-sm text-gray-500 text-center">
                <p>Tax and shipping calculated at checkout</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Manage Inventory Button - Only show for vendors */}
      {mockUser.role === "vendor" && (
        <div className="fixed bottom-4 right-4 z-50">
          <Link href="/cart/inventory">
            <button className="inline-flex items-center px-4 py-3 border border-transparent shadow-lg text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              Manage Inventory
            </button>
          </Link>
        </div>
      )}
    </Layout>
  );
}
