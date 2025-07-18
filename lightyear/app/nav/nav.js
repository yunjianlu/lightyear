// create and export navbar component
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between ">
        <div className="text-white text-lg font-bold">Lightyear</div>
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
            <Link href="/login">
              <button className="text-gray-300 hover:text-white bg-transparent border-none cursor-pointer">
                Login
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
