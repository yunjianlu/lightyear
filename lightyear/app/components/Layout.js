"use client";
import Nav from "./nav";
import Footer from "./footer";
import { useState, useEffect, createContext } from "react";

// Reusable layout component - only used when explicitly imported and wrapped around content
// This provides consistent header, navigation, and footer across your site

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
        {/* Reuse existing Nav component */}
        <Nav />

        {/*  Your content body area or children */}
        <main className="flex-1 pt-20 md:pt-15 bg-[url(/images/about/largerNightSky_pic.png)]">
          {children} {/* This is where each page's content will be displayed */}
        </main>

        {/* Reuse existing Footer component */}
        <Footer />
    </div>
  );
}