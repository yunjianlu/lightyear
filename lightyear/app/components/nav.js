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
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-50 shadow">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/light-year-logo.png"
            alt="Lightyear Logo"
            width={48}
            height={48}
            className="rounded"
          />
          <span className="text-white text-lg font-bold">Lightyear</span>
        </div>
        <div className="flex flex-wrap items-center space-x-8 w-full md:w-auto mt-2 md:mt-0">
          <ul className="flex space-x-4">
            {/* Home navigation link - returns to main landing page */}
            <li>
              <Link href="/" className="text-gray-300 hover:text-white">
                Home
              </Link>
            </li>
            {/* Account/Profile link - user account management */}
            <li>
              <Link href="/profile" className="text-gray-300 hover:text-white">
                Account
              </Link>
            </li>
            {/* Shopping cart link - view cart items and checkout */}
            <li>
              <Link
                href="/cart"
                className="text-gray-300 hover:text-white relative"
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
                <button className="text-gray-300 hover:text-white bg-transparent border-none cursor-pointer">
                  Product Details
                </button>
              </Link>
            </li>
            {/* User authentication link - login/logout functionality */}
            <li>
              <Link href="/login">
                <button className="text-gray-300 hover:text-white bg-transparent border-none cursor-pointer">
                  Login
                </button>
              </Link>
            </li>
          </ul>
          <form
            className="flex items-center w-full md:w-auto mt-2 md:mt-0"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Mobile filter toggle button - shows/hides filter sidebar on small screens */}
            <button
              type="button"
              className="block md:hidden mr-2 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
              aria-label="Show Filters"
              // onClick={handleShowFilters} // Uncomment and implement if you have a handler
            >
              Filters
            </button>
            {/* Product search input - allows users to search for specific products */}
            <input
              type="text"
              placeholder="Search Products..."
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-2 py-1 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-red-400 placeholder-gray-300"
              style={{ minWidth: 100 }}
            />
            {/* Search submit button - executes product search */}
            <button
              type="submit"
              className="ml-2 px-3 py-1 bg-red-700 text-white rounded hover:bg-red-800"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
