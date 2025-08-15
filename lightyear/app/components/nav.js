/**
 * Navigation Component (Nav)
 *
 * The main navigation bar component that provides site-wide navigation and functionality.
 * Features:
 * - Fixed positioning at top of page with shadow and z-index layering
 * - Brand logo and company name with optimized Next.js Image component
 * - Responsive navigation links (Home, Account, Cart, Products, Login)
 * - Product search functionality with input field and submit button
 * - Mobile-responsive design with flexible layout
 * - Mobile filter toggle button for small screens
 * - Hover effects and focus states for accessibility
 * - Uses Next.js Link components for client-side navigation
 *
 * Layout: Fixed header that spans full width, pushes content down with padding
 * Styling: Dark theme (gray-800) with red accent colors for interactive elements
 * Used in: All pages through Layout component and directly in root page
 */
// create and export navbar component

"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function Nav() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { getCartItemCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/product?search=${encodeURIComponent(search.trim())}`);
    }
  };
  return (
    <nav className="bg-gray-800 fixed top-0 left-0 w-full z-50 shadow">
      <div className="flex flex-wrap justify-between items-center px-4 py-4 gap-y-2">
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Image
            src="/lightyear/images/light-year-logo.png"
            alt="Lightyear Logo"
            width={48}
            height={48}
            className="rounded"
          />
          <span className="text-white text-lg font-bold whitespace-nowrap">
            Lightyear
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 ml-4 mr-4">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 justify-end">
            {/* Home navigation link - returns to main landing page */}
            <li>
              <Link
                href="/"
                className="text-gray-300 hover:text-white whitespace-nowrap"
              >
                Home
              </Link>
            </li>
            {/* Account/Profile link - user account management */}
            <li>
              <Link
                href="/profile"
                className="text-gray-300 hover:text-white whitespace-nowrap"
              >
                Account
              </Link>
            </li>
            {/* Shopping cart link - view cart items and checkout */}
            <li>
              <Link
                href="/cart"
                className="text-gray-300 hover:text-white relative whitespace-nowrap"
              >
                Cart
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </Link>
            </li>
            {/* Product catalog link - browse all products */}
            <li>
              <Link href="/product">
                <button className="text-gray-300 hover:text-white bg-transparent border-none cursor-pointer whitespace-nowrap">
                  Product Details
                </button>
              </Link>
            </li>
            {/* User authentication link - login/logout functionality */}
            <li>
              <Link href="/login">
                <button className="text-gray-300 hover:text-white bg-transparent border-none cursor-pointer whitespace-nowrap">
                  Login
                </button>
              </Link>
            </li>
          </ul>
          <form
            className="flex items-center gap-x-2 ml-16 md:ml-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Product search input - allows users to search for specific products */}
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-2 py-1 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-red-400 placeholder-gray-300"
              style={{ minWidth: 60 }}
            />
            {/* Search submit button - executes product search */}
            <button
              type="submit"
              className="px-2 py-1 bg-red-700 text-white rounded hover:bg-red-800 text-sm whitespace-nowrap"
              onClick={handleSearch}
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
