import React, { useState } from "react";
import ArrowRight from "../../src/assets/arrow_right.svg";
import ArrowLeft from "../../src/assets/arrow_left.svg";

function Sidebar() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);

  // const items = [
  //   { id: 1, name: "Men", subItems: ["Shirts", "Pants"] },
  //   { id: 2, name: "Women", subItems: ["Dresses", "Tops"] },
  //   { id: 3, name: "Kids", subItems: ["Toys", "Clothes"] },
  //   { id: 4, name: "Shoes", subItems: ["Sneakers", "Boots"] },
  //   { id: 5, name: "Accessories", subItems: ["Bags", "Belts"] },
  // ];
  const items = [
    {
      id: 1,
      name: "Men",
      subItems: [
        {
          name: "Shirts",
          subSubItems: ["Mock 1-1-1", "Mock 1-1-2"],
        },
        {
          name: "Pants",
          subSubItems: ["Mock1-2-1", "Mock 1-2-2"],
        },
      ],
    },
    {
      id: 2,
      name: "Women",
      subItems: [
        {
          name: "Dresses",
          subSubItems: ["Mock 2-1-1", "Mock 2-1-2"],
        },
        {
          name: "Tops",
          subSubItems: ["Mock2-2-1", "Mock 2-2-2"],
        },
      ],
    },
    {
      id: 3,
      name: "Kids",
      subItems: [
        {
          name: "Toys",
          subSubItems: ["Mock 1-1-1", "Mock 1-1-2"],
        },
        {
          name: "Clothes",
          subSubItems: ["Mock1-2-1", "Mock 1-2-2"],
        },
      ],
    },
    {
      id: 4,
      name: "Shoes",
      subItems: [
        {
          name: "Sneakers",
          subSubItems: ["Mock 2-1-1", "Mock 2-1-2"],
        },
        {
          name: "Boots",
          subSubItems: ["Mock 2-2-1", "Mock 2-2-2"],
        },
      ],
    },
    {
      id: 5,
      name: "Accessories",
      subItems: [
        {
          name: "Bags",
          subSubItems: ["Mock 2-1-1", "Mock 2-1-2"],
        },
        {
          name: "Belts",
          subSubItems: ["Mock 2-2-1", "Mock 2-2-2"],
        },
      ],
    },
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item); // Select the item and show sub-sidebar
    setSelectedSubItem(null); // Reset the sub-item selection
  };

  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem); // Select the sub-item and show sub-sub-sidebar
  };

  const handleBackClick = () => {
    setSelectedSubItem(null); // Go back to the sub-sidebar
  };

  const handleMainBackClick = () => {
    setSelectedItem(null); // Go back to the main sidebar
    setSelectedSubItem(null); // Reset the sub-item selection
  };

  return (
    <aside
      id="sidebar"
      className="fixed top-0 left-0 z-40 w-[321px] h-screen rounded-r-[16px] text-black"
      aria-label="Sidebar"
    >
      <div className="h-full  bg-gray-50 dark:bg-gray-800">
        {/* Main Sidebar (hidden when an item is clicked) */}
        {!selectedItem && (
          <div className="pt-[20px]">
            <div className="font-medium flex flex-col px-[32px] ">
              <div className="flex items-center h-[48px] mb-2">Home</div>
              <ul>
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center h-[48px] mb-2 justify-between"
                  >
                    <span className="w-full">{item.name}</span>
                    {/* Arrow Icon */}
                    <a href="#" onClick={() => handleItemClick(item)}>
                      <img
                        src={ArrowRight}
                        alt="Search"
                        className="w-[40px] h-[40px]"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Sub-sidebar (shown when an item is clicked) */}
        {selectedItem && !selectedSubItem && (
          <div className="pt-[16px]">
            <div className="font-medium flex flex-col">
              <div className="flex items-center h-[48px] mb-2 px-[16px] justify-between border-b border-b-black-300">
                <a href="#" onClick={handleMainBackClick}>
                  <img
                    src={ArrowLeft}
                    alt="Search"
                    className="w-[40px] h-[40px]"
                  />
                </a>
                <h2 className="text-h6Bold w-[225px]">{selectedItem.name}</h2>
              </div>
              <ul className="px-[32px]">
                {selectedItem.subItems.map((subItem, index) => (
                  <li
                    key={index}
                    className="flex items-center h-[48px] mb-2 justify-between"
                  >
                    <span className="w-full">{subItem.name}</span>
                    {/* Arrow Icon */}
                    <a href="#" onClick={() => handleSubItemClick(subItem)}>
                      <img
                        src={ArrowRight}
                        alt="Search"
                        className="w-[40px] h-[40px]"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Sub-sub-sidebar (shown when a sub-item is clicked) */}
        {selectedSubItem && (
          <div className="pt-[16px]">
            <div className="font-medium flex flex-col">
              <div className="flex items-center h-[48px] mb-2 px-[16px] justify-between border-b border-b-black-300">
                <a href="#" onClick={handleBackClick}>
                  <img
                    src={ArrowLeft}
                    alt="Search"
                    className="w-[40px] h-[40px]"
                  />
                </a>
                <h2 className="text-h6Bold w-[225px]">
                  {selectedSubItem.name}
                </h2>
              </div>
              <ul className="px-[32px] text-subTitle">
                {selectedSubItem.subSubItems.map((subSubItem, index) => (
                  <li
                    key={index}
                    className="flex items-center h-[48px] pl-[10px] mb-2 justify-between hover:bg-limeGreen-700 transition-colors duration-200"
                  >
                    {subSubItem}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
