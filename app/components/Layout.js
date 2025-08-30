"use client";
import Nav from "./nav";
import Footer from "./footer";
import { useState, useEffect, createContext } from "react";

// Reusable layout component - only used when explicitly imported and wrapped around content
// This provides consistent header, navigation, and footer across your site
// const initialCategory = "All";
// const initialPrice = 0;
// const initialRating = "0";
// const initialInStock = false;
// const initialOutOfStock = false;

// export const filteringValuesContext = {
//   categoryValue: createContext(initialCategory),
//   priceValue: createContext(initialPrice),
//   ratingValue: createContext(initialRating),
//   inStockValue: createContext(initialInStock),
//   outOfStockValue: createContext(initialOutOfStock)
// }

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
        {/* Reuse existing Nav component */}
        <Nav />

        {/*  Your content body area or children */}
        <main className="flex-1 pt-20 md:pt-15 bg-[url(/images/about/largerNightSky_pic.png)]">
          {children} {/* This is where each page's content will be displayed */}
          {/* In your <LoginPage /> component , you should return:
            <Layout> 
              {login content div} 
            </Layout> */}
        </main>

        {/* Reuse existing Footer component */}
        <Footer />
    </div>
  );
}