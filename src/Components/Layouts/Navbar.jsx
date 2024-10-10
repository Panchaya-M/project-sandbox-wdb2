function Navbar() {
  return (
    <nav className="bg-black text-white">
      {/* Container */}
      <div className="container mx-auto py-2.5">
        {/* Left panel */}
        <div className="flex items-center gap-x-4">
          {/* Logo Container */}
          <div className="">
            {/* Logo Image */}
            <img src="/images/nav-logo-white.png" alt="Logo" />
          </div>

          {/* Menu Container */}
          <div className="">
            <ul className="flex gap-x-2">
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>Shoes</li>
              <li>Accessories</li>
            </ul>
          </div>
        </div>

        {/* Right panel */}
        <div className="">
          {/* Cart */}
          <div className=""></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
