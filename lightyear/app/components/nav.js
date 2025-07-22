// create and export navbar component

"use client";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-50 shadow">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="text-white text-lg font-bold">Lightyear</div>
        <div className="flex flex-wrap items-center space-x-8 w-full md:w-auto mt-2 md:mt-0">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-gray-300 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-300 hover:text-white">
                Account
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-300 hover:text-white">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/product">
                <button className="text-gray-300 hover:text-white bg-transparent border-none cursor-pointer">
                  Product Details
                </button>
              </Link>
            </li>
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
            <input
              type="text"
              placeholder="Search Products..."
              className="flex-1 px-2 py-1 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-red-400 placeholder-gray-300"
              style={{ minWidth: 80 }}
            />
            <button
              type="submit"
              className="ml-2 px-3 py-1 bg-red-700 text-white rounded hover:bg-red-800"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
