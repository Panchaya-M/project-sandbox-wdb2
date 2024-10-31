import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import BasketEmpty from "../../assets/basket-empty.svg";
import Search from "../../assets/search_w.svg";
import Heart from "../../assets/heart_w.svg";
import Person from "../../assets/person_w.svg";
import Cart from "../../assets/cart_w.svg";
import Hamburger from "../../assets/hamburger.svg";
import { getParentCategory } from "../../api";
import Badge from "@mui/material/Badge";
import { CartContext } from "../contexts/CartContext.jsx";
import { CategoryContext } from "../contexts/CategoryContext";

function getLink(category) {
  return `/products/${category}`;
}

function Navbar({ setIsSidebarOpen, isSidebarOpen }) {
  const { mappedItem, invisible } = useContext(CartContext);

  useEffect(() => {
    getMenuItems();
  }, []);

  async function getMenuItems() {
    const menuItems = await getParentCategory();

    setMenuItems(menuItems);
  }
  const { parentCategories } = useContext(CategoryContext);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setMenuItems(parentCategories);
  }, [parentCategories]);

  return (
    <nav className="bg-black text-white">
      {/* Container */}
      <div className="container mx-auto flex items-center justify-between py-2.5">
        {/* Left panel */}
        <div className="flex items-center gap-x-2 sx:gap-x-10">
          {/* Logo Container */}
          <div className="flex gap-x-4">
            {/* Hamburger Icon */}
            <button
              className=""
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <img className="flex md:hidden" src={Hamburger} alt="Hamburger" />
            </button>
            {/* Logo Image */}
            <Link to="/">
              <img src="/images/nav-logo-white.png" alt="Logo" />
            </Link>
          </div>

          {/* Menu Container */}
          <div className="">
            <ul className="hidden sx:flex gap-x-6">
              {menuItems.length > 0 ? (
                menuItems.map((item, index) => (
                  <li key={`nav-item-${index}`}>
                    <Link to={getLink(item.permalink)}>{item.name}</Link>
                  </li>
                ))
              ) : (
                <p>Loading items...</p>
              )}
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
              <Link to="/summary">
                <Badge
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "red",
                    },
                  }}
                  variant="dot"
                  invisible={invisible}
                >
                  <img src={Cart} alt="Cart" className="h-5" />
                </Badge>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// <div>
//         <Badge color="secondary" variant="dot" invisible={invisible}>
//           <MailIcon />
//         </Badge>
//         <FormControlLabel
//           sx={{ color: 'text.primary' }}
//           control={<Switch checked={!invisible} onChange={handleBadgeVisibility} />}
//           label="Show Badge"
//         />
//       </div>

export default Navbar;
