/**
 * SideFilterBar Component
 *
 * A responsive filter sidebar component for product filtering and search refinement.
 * Features:
 * - Dual display modes: mobile drawer overlay and desktop sticky sidebar
 * - Multiple filter types: category, price range, rating, stock availability
 * - Mobile-first responsive design with breakpoint-based layout switching
 * - Interactive controls: dropdowns, range sliders, checkboxes
 * - Modal/drawer functionality for mobile with backdrop click-to-close
 * - Sticky positioning on desktop for persistent filtering while scrolling
 * - Apply filters button with placeholder logic for future implementation
 *
 * Mobile Behavior:
 * - Hidden by default, triggered by filter button in nav or floating button
 * - Slides in as drawer from left side with backdrop overlay
 * - Takes 3/4 screen width with close button in header
 *
 * Desktop Behavior:
 * - Always visible as sticky sidebar taking 1/4 or 1/5 of layout width
 * - Positioned below fixed navigation with calculated viewport height
 *
 * Used in: Home page layout alongside LandingBody component
 * TODO: Connect filter controls to actual product filtering logic
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// SideFilterBar component for filtering products
export default function SideFilterBar() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState("0");
  const [inStock, setInStock] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  // Filter content
  const filterContent = (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      {/* Category Filter - allows filtering by product type */}
      <div className="mb-2">
        <label className="block font-medium mb-1">Category</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="weapons">Weapons</option>
          <option value="armor">Armor</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Price Range Filter - slider to set maximum price */}
      <div className="mb-2">
        <label className="block font-medium mb-1">Price Range: ${price}</label>
        <input
          type="range"
          min="0"
          max="1500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Rating Filter - minimum star rating threshold */}
      <div className="mb-2">
        <label className="block font-medium mb-1">Minimum Rating</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="0">All Ratings</option>
          <option value="1">1+ Stars</option>
          <option value="2">2+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      {/* Stock Availability Filter - checkbox options for stock status */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Availability</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
            />
            <span>In Stock</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={outOfStock}
              onChange={(e) => setOutOfStock(e.target.checked)}
            />
            <span>Out of Stock</span>
          </label>
        </div>
      </div>

      {/* Apply Filters Button - triggers filter application */}
      <div className="mt-6">
        <button
          className="w-full bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800 transition-colors"
          onClick={() => {
            // TODO: Implement filter application logic
            console.log("Applying filters...");
            const params = new URLSearchParams();
            if (category !== "All") params.append("category", category);
            if (price > 0) params.append("price", price);
            if (rating !== "0") params.append("rating", rating);
            if (inStock) params.append("inStock", "true");
            if (outOfStock) params.append("outOfStock", "true");

            router.push(`/product?${params.toString()}`);
            setOpen(false); // Close the drawer after applying filters
          }}
        >
          Apply Filters
        </button>
      </div>

      {/* Add more filters as needed */}
    </div>
  );

  return (
    <>
      {/* Mobile: Show button */}
      <button
        className="block md:hidden fixed top-20 left-2 z-50 bg-red-700 text-white px-3 py-2 rounded shadow text-sm"
        onClick={() => setOpen(true)}
      >
        Filter
      </button>

      {/* Mobile: Drawer/modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-white shadow-md w-3/4 max-w-xs h-full overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-bold">Filters</span>
              <button
                onClick={() => setOpen(false)}
                className="text-red-700 font-bold text-lg"
              >
                &times;
              </button>
            </div>
            {filterContent}
          </div>
          <div
            className="flex-1 bg-black bg-opacity-30"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      {/* Desktop: Sticky sidebar */}
      <aside
        className="hidden md:block md:sticky md:top-20 md:h-[calc(100vh-5rem)] bg-white shadow-md md:p-4 md:w-1/4 lg:w-1/5 z-40"
        style={{ minWidth: 200 }}
      >
        {filterContent}
      </aside>
    </>
  );
}
