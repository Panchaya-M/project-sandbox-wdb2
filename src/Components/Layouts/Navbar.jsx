import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";

// import BasketEmpty from "../../assets/basket-empty.svg";
import Search from "../../assets/search_w.svg";
import Heart from "../../assets/heart_w.svg";
import Person from "../../assets/person_w.svg";
import Cart from "../../assets/cart_w.svg";
import Hamburger from "../../assets/hamburger.svg";
import {getParentCategory} from '../../api';

function getLink(category) {
  return `/products/${category}`;
}

const FixedMenuItems = [
  { name: "Men", link: "men" },
  { name: "Women", link: "women" },
  { name: "Collections", link: "collections" },
];

function Navbar({ setIsSidebarOpen, isSidebarOpen }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getMenuItems()
  }, [])

  async function getMenuItems() {
    const menuItems = await getParentCategory();

    setMenuItems(menuItems);
  }

  return (
    <nav className="bg-black text-white">
      {/* Container */}
      <div className="container mx-auto flex items-center justify-between py-2.5">
        {/* Left panel */}
        <div className="flex items-center gap-x-2 sx:gap-x-10">
          {/* Logo Container */}
          <div className="flex gap-x-4">
            {/* Hamburger Icon */}
            <button className="" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <img className="flex sx:hidden" src={Hamburger} alt="Hamburger" />
            </button>
            {/* Logo Image */}
            <Link to="/"><img src="/images/nav-logo-white.png" alt="Logo" /></Link>
          </div>

          {/* Menu Container */}
          <div className="">
            <ul className="hidden sx:flex gap-x-6">
              {
                menuItems.length > 0 ? 
                menuItems.map((item, index) => (
                  <li key={`nav-item-${index}`}>
                    <Link to={getLink(item.permalink)}>{item.name}</Link>
                  </li>
                )) : (
                  <p>Loading items...</p>
                ) 
              }
            </ul>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex">
          {/* Cart */}
          <ul className="flex items-center gap-x-6">
            <li className="">
              <img src={Search} alt="Search" className="h-5" />
            </li>
            <li>
              <img src={Heart} alt="Heart" className="h-5" />
            </li>
            <li>
              <img src={Person} alt="Person" className="h-5" />
            </li>
            <li>
              <Link to="/cart">
                <img src={Cart} alt="Cart" className="h-5" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
