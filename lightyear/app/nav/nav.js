// create and export navbar component

export default function Nav() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between ">
        <div className="text-white text-lg font-bold">Lightyear</div>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-gray-300 hover:text-white">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="text-gray-300 hover:text-white">
              Account
            </a>
          </li>
          <li>
            <a href="/contact" className="text-gray-300 hover:text-white">
              Cart
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
