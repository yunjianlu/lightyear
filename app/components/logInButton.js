/**
 * LogInButton Component
 *
 * A reusable authentication button component that handles login/logout functionality.
 * Features:
 * - Dynamic button text based on authentication state (Login/Logout)
 * - User session management and state tracking
 * - Navigation to login page for unauthenticated users
 * - Logout functionality with session cleanup
 * - Loading states during authentication operations
 * - Accessible button design with hover effects
 * - Integration with authentication API endpoints
 *
 * States:
 * - Logged out: Shows "Login" button, navigates to /login page
 * - Logged in: Shows "Logout" button, performs logout action
 * - Loading: Shows loading state during auth operations
 *
 * Props:
 * - className: Optional custom CSS classes for styling
 * - onAuthChange: Optional callback for parent components to handle auth state changes
 *
 * Used in: Navigation bar, user account sections, protected pages
 */

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function LogInButton({ className = "", onAuthChange }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   // Check authentication status on component mount
//   useEffect(() => {
//     // TODO: Replace with actual authentication check
//     // This could check localStorage, cookies, or make an API call
//     const checkAuthStatus = () => {
//       // Placeholder: Check if user token exists
//       const token = localStorage.getItem("userToken");
//       setIsLoggedIn(!!token);
//     };

//     checkAuthStatus();
//   }, []);

//   // Handle login button click - navigate to login page
//   const handleLogin = () => {
//     router.push("/login");
//   };

//   // Handle logout button click - clear session and redirect
//   const handleLogout = async () => {
//     setLoading(true);

//     try {
//       // TODO: Make API call to logout endpoint
//       // await fetch('/api/auth/logout', { method: 'POST' });

//       // Clear local storage/session data
//       localStorage.removeItem("userToken");
//       localStorage.removeItem("userData");

//       // Update state
//       setIsLoggedIn(false);

//       // Notify parent component if callback provided
//       if (onAuthChange) {
//         onAuthChange(false);
//       }

//       // Redirect to home page
//       router.push("/");
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       className={`px-4 py-2 text-white bg-red-700 hover:bg-red-800 rounded transition-colors disabled:opacity-50 ${className}`}
//       onClick={isLoggedIn ? handleLogout : handleLogin}
//       disabled={loading}
//     >
//       {loading ? "Loading..." : isLoggedIn ? "Logout" : "Login"}
//     </button>
//   );
// }
