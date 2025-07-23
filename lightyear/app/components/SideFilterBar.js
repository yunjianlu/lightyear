"use client";

import { useState } from "react";

// SideFilterBar component for filtering products
export default function SideFilterBar() {
  const [open, setOpen] = useState(false);

  // Filter content
  const filterContent = (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      {/* Category Filter - allows filtering by product type */}
      <div className="mb-2">
        <label className="block font-medium mb-1">Category</label>
        <select className="w-full border rounded px-2 py-1">
          <option>All</option>
          <option>Lightsabers</option>
          <option>Helmets</option>
          <option>Plush</option>
        </select>
      </div>

      {/* Price Range Filter - slider to set maximum price */}
      <div className="mb-2">
        <label className="block font-medium mb-1">Price Range</label>
        <input type="range" min="0" max="1500" className="w-full" />
      </div>

      {/* Rating Filter - minimum star rating threshold */}
      <div className="mb-2">
        <label className="block font-medium mb-1">Minimum Rating</label>
        <select className="w-full border rounded px-2 py-1">
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
            <input type="checkbox" className="mr-2" />
            <span>In Stock</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
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
        className="block md:hidden fixed top-20 left-2 z-50 bg-red-700 text-white px-4 py-2 rounded shadow"
        onClick={() => setOpen(true)}
      >
        Filters
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
