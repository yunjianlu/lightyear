"use client";
import Nav from "./nav";
import Footer from "./footer";

// Main Layout component that wraps all pages
// This provides consistent header, navigation, and footer across your site
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Reuse existing Nav component */}
      <Nav />

      {/* Main Content Area - replace with your content body or children */}
      <main className="flex-1 pt-20">
        {children} {/* This is where each page's content will be displayed */}
      </main>

      {/* Reuse existing Footer component */}
      <Footer />
    </div>
  );
}
