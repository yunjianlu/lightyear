"use client";
import { useState, useEffect } from "react";

// Main Layout component that wraps all pages
// This provides consistent header, navigation, and footer across your site
export default function Layout({ children }) {
  // State to track if user is logged in
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when component loads
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Function to check if user is currently logged in
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);  // User is logged in
      }
      // If response is not ok, user is not logged in (user stays null)
    } catch (error) {
      // If there's an error, assume user is not logged in
      console.log('Auth check failed:', error);
    } finally {
      setLoading(false);  // Stop loading spinner
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST'
      });
      
      if (response.ok) {
        setUser(null);  // Clear user from state
        window.location.href = '/';  // Redirect to home page
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout request fails, redirect anyway
      setUser(null);
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo/Brand */}
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-red-800 hover:text-red-900">
                Lightyear
              </a>
            </div>

            {/* Main Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="/" 
                className="text-gray-700 hover:text-red-800 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </a>
              <a 
                href="/product" 
                className="text-gray-700 hover:text-red-800 px-3 py-2 text-sm font-medium transition-colors"
              >
                Products
              </a>
              <a 
                href="/cart" 
                className="text-gray-700 hover:text-red-800 px-3 py-2 text-sm font-medium transition-colors"
              >
                Cart
              </a>
            </div>

            {/* User Authentication Area */}
            <div className="flex items-center space-x-4">
              {loading ? (
                // Show loading while checking auth status
                <div className="text-sm text-gray-500">Loading...</div>
              ) : user ? (
                // User is logged in - show user menu
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    Welcome, {user.firstName}!
                  </span>
                  <a 
                    href="/dashboard" 
                    className="text-red-800 hover:text-red-900 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </a>
                  <a 
                    href="/profile" 
                    className="text-gray-700 hover:text-red-800 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className="bg-red-800 text-white px-4 py-2 text-sm font-medium rounded hover:bg-red-900 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                // User is not logged in - show login/register links
                <div className="flex items-center space-x-4">
                  <a 
                    href="/login" 
                    className="text-red-800 hover:text-red-900 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Login
                  </a>
                  <a 
                    href="/login" 
                    className="bg-red-800 text-white px-4 py-2 text-sm font-medium rounded hover:bg-red-900 transition-colors"
                  >
                    Sign Up
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation Menu (hidden by default, you can expand this later) */}
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 mt-2">
              <a 
                href="/" 
                className="block text-gray-700 hover:text-red-800 px-3 py-2 text-base font-medium"
              >
                Home
              </a>
              <a 
                href="/product" 
                className="block text-gray-700 hover:text-red-800 px-3 py-2 text-base font-medium"
              >
                Products
              </a>
              <a 
                href="/cart" 
                className="block text-gray-700 hover:text-red-800 px-3 py-2 text-base font-medium"
              >
                Cart
              </a>
              {user && (
                <>
                  <a 
                    href="/dashboard" 
                    className="block text-gray-700 hover:text-red-800 px-3 py-2 text-base font-medium"
                  >
                    Dashboard
                  </a>
                  <a 
                    href="/profile" 
                    className="block text-gray-700 hover:text-red-800 px-3 py-2 text-base font-medium"
                  >
                    Profile
                  </a>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}  {/* This is where each page's content will be displayed */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Lightyear</h3>
              <p className="text-gray-300 text-sm">
                Your trusted e-commerce platform for all your shopping needs.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="/product" className="text-gray-300 hover:text-white transition-colors">Products</a></li>
                <li><a href="/cart" className="text-gray-300 hover:text-white transition-colors">Cart</a></li>
              </ul>
            </div>
            
            {/* Account */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-sm">
                {user ? (
                  <>
                    <li><a href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</a></li>
                    <li><a href="/profile" className="text-gray-300 hover:text-white transition-colors">Profile</a></li>
                  </>
                ) : (
                  <>
                    <li><a href="/login" className="text-gray-300 hover:text-white transition-colors">Login</a></li>
                    <li><a href="/login" className="text-gray-300 hover:text-white transition-colors">Sign Up</a></li>
                  </>
                )}
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2025 Lightyear. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}