import BasketEmpty from "../../assets/basket-empty.svg";
import Search from "../../assets/search_w.svg";
import Heart from "../../assets/heart_w.svg";
import Person from "../../assets/person_w.svg";
import Cart from "../../assets/cart_w.svg";

function Navbar() {
  return (
    <nav className="bg-black text-white">
      {/* Container */}
      <div className="container mx-auto flex items-center justify-between py-2.5">
        {/* Left panel */}
        <div className="flex items-center gap-x-10">
          {/* Logo Container */}
          <div className="">
            {/* Logo Image */}
            <img src="/images/nav-logo-white.png" alt="Logo" />
          </div>

          {/* Menu Container */}
          <div className="">
            <ul className="hidden sm:flex gap-x-6">
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>Shoes</li>
              <li>Accessories</li>
            </ul>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex">
          {/* Cart */}
          <ul className="flex gap-x-6">
            <li className="">
              <img src={Search} alt="Search" />
            </li>
            <li>
              <img src={Heart} alt="Heart" />
            </li>
            <li>
              <img src={Person} alt="Person" />
            </li>
            <li>
              <img src={Cart} alt="Cart" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
