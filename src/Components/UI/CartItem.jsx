import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Button, { ButtonCustom } from "../UI/Button.jsx";
import CardEmpty from "../../assets/images/empty_cart.png";
import Delete from "../../assets/delete.svg";
<<<<<<< HEAD
import Dropdown from "./Dropdown.jsx";
=======
import Dropdown, { DropdownCustom } from "./Dropdown.jsx";
>>>>>>> develop
import Arrow from "../../assets/arrow_down.svg";
import { updateItemInCart } from "../../api.js";

// Define the custom size order
const sizeOrder = ["S", "M", "L", "XL"];

// // Sort the variants by size using the custom order
// const sortedVariantBySize = (variants = []) => {
//   if (sizeOrder.includes(variants[0])) {
//     return variants?.sort(
//       (a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
//     );
//   }

//   return variants?.sort((a, b) => a - b);
// };

function SelectBox({
  type,
  name,
  items,
  defaultValue,
  onChange,
  disabledOptions = [],
}) {
  let isDisabled = false;
  if (defaultValue === undefined) isDisabled = true;
  if (items === undefined) items = [];

  return (
    <div className="relative">
      <select
        id={`${type}-${name}`}
        defaultValue={defaultValue}
        disabled={isDisabled}
        onChange={onChange}
        className={`block appearance-none w-full h-[54px]  border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none  focus:border-gray-500 ${
          isDisabled ? "bg-gray-200" : "bg-white focus:bg-white"
        }`}
      >
        {items.map((item, index) => (
          <option
            key={index}
            value={item}
            disabled={disabledOptions.includes(item)}
          >
            {item}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <img src={Arrow} className="h-4 w-4" />
      </div>
    </div>
  );
}

const CartItem = ({
  item,
  onColorChange,
  onSizeChange,
  onRemove,
  cartId,
  onQuantityChange,
}) => {
  const [selectedColor, setSelectedColor] = useState(item.defaultColor);
  const [selectedSize, setSelectedSize] = useState(item.defaultSize);
  const [selectedQuantity, setSelectedQuantity] = useState(
    item.defaultQuantity
  );

  // Filter sizes for the selected color and disable those with remains = 0
  const availableSizes = item.sizes;
  const disabledSizes = item.variants
    .filter(
      (variant) => variant.color === selectedColor && variant.remains === 0
    )
    .map((variant) => variant.size);

  // Filter colors for the selected size and disable those with remains = 0
  const availableColors = item.colors;
  const disabledColors = item.variants
    .filter((variant) => variant.size === selectedSize && variant.remains === 0)
    .map((variant) => variant.color);

  // Update the cart based on color, size, and quantity selection
  const updateCartItem = async (newColor, newSize, newQuantity) => {
    const matchingVariant = item.variants.find(
      (variant) => variant.color === newColor && variant.size === newSize
    );

    if (matchingVariant && matchingVariant.remains > 0) {
      const body = {
        skuCode: matchingVariant.skuCode,
        quantity: newQuantity,
      };

      try {
        await updateItemInCart(cartId, item.id, body);
        console.log("Cart updated successfully");
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    } else {
      console.warn("No stock available for this color/size combination");
    }
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    updateCartItem(newColor, selectedSize, selectedQuantity);
  };

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    setSelectedSize(newSize);

    updateCartItem(selectedColor, newSize, selectedQuantity);
  };

  const handleQuantityChange = (e) => {
    console.log(">>>>>> ", e.target.value);

    const newQuantity = Number(e.target.value);
    onQuantityChange(newQuantity);
    setSelectedQuantity(newQuantity);

    // Pass the current color, size, and updated quantity to the updateCartItem function
    updateCartItem(selectedColor, selectedSize, newQuantity);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="w-full sm:w-48 h-48 flex-shrink-0 overflow-hidden rounded-md">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="text-h6Bold hover:text-gray-700 line-clamp-2">
              {item.name}
            </h3>
            <button
              onClick={() => onRemove(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200 ml-2"
              aria-label="Remove item"
            >
              <img src={Delete} alt="Delete" className="h-10 w-10" />
            </button>
          </div>

          <div className="flex flex-col items-end sm:flex-row sm:items-end sm:justify-between space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 w-full sm:w-auto">
              <div className="col-span-2 sm:col-span-1 md:col-span-1">
                <label
                  htmlFor={`color-${item.id}`}
                  className="text-bodyText text-gray-500 mb-1 block"
                >
                  Color
                </label>
                <SelectBox
                  type="color"
                  name={item.name}
                  items={availableColors}
                  defaultValue={selectedColor}
                  onChange={handleColorChange}
                  disabledOptions={disabledColors}
                />
              </div>

              <div className="col-span-1 sm:col-span-1 md:col-span-1">
                <label
                  htmlFor={`size-${item.id}`}
                  className="text-bodyText text-gray-500 mb-1 block"
                >
                  Size
                </label>
                <SelectBox
                  type="size"
                  name={item.name}
                  items={availableSizes}
                  defaultValue={selectedSize}
                  onChange={handleSizeChange}
                  disabledOptions={disabledSizes}
                />
              </div>

              <div className="col-span-1 sm:col-span-1 md:col-span-1">
                <label
                  htmlFor={`quantity-${item.id}`}
                  className="text-bodyText text-gray-500 mb-1 block"
                >
                  Quantity
                </label>
                <SelectBox
                  type="quantity"
                  name={item.name}
                  items={item.quantities}
                  defaultValue={selectedQuantity}
                  onChange={handleQuantityChange}
                />
              </div>
            </div>

            <div className="flex flex-row items-end">
              <p className="text-subHeading">
                THB {item.price.toLocaleString()}.00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function CartEmpty() {
  return (
    <>
      {/* item cart empty part */}
      <div className="flex flex-col justify-center items-center text-center space-y-6 p-6">
        <div>
          <img
            src={CardEmpty}
            alt="Empty Cart"
            className="mx-auto w-[403px] h-[403px]"
          />
        </div>
        <div className="flex flex-col justify-center space-y-2">
          <h1 className="text-h4Bold ">Your cart is empty</h1>
          <p className="text-subHeading ">
            Looks like you have not added anything to your cart.
            <br />
            Go ahead & explore top categories.
          </p>
        </div>
        <div>
          <Link to="/products" className="no-underline hover:no-underline">
            <Button
              text="Continue shopping"
              customClassName="transition-colors duration-200"
            ></Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CartItem;

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    quantities: PropTypes.arrayOf(PropTypes.number).isRequired,
    defaultColor: PropTypes.string.isRequired,
    defaultSize: PropTypes.string.isRequired,
    defaultQuantity: PropTypes.number.isRequired,
  }).isRequired,
};
