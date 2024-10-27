import React, { useState } from "react";
import PropTypes from "prop-types";
import Delete from "../../assets/delete.svg";
import Arrow from "../../assets/arrow_down.svg";

function SelectBox({ type, name, items }) {
  console.log("items", items);
  return (
    <div className="relative">
      <select
        id={`${type}-${name}`}
        // defaultValue={defaultColor}
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        {items.map((item) => (
          <option key={item} value={item}>
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

const CartItem = ({ item }) => {
  const [selectedColor, setSelectedColor] = useState(item.defaultColor);
  const [selectedSize, setSelectedSize] = useState(item.defaultSize);
  const [selectedQuantity, setSelectedQuantity] = useState(
    item.defaultQuantity
  );

  const handleQuantityChange = (e) => {
    setSelectedQuantity(Number(e.target.value));
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleRemove = () => {
    console.log("Remove item:", item.id);
  };

  return (
    <div className="bg-white p-4 flex flex-col sm:flex-row items-start sm:items-center">
      <img
        src={item.image}
        alt={item.name}
        width={100}
        height={100}
        className=" mb-4 sm:mb-0 sm:mr-6 w-full sm:w-auto sm:h-32 object-cover"
      />
      <div className="flex-grow space-y-2 w-full">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <button className="text-gray-500 hover:text-red-500 p-1">
            <img src={Delete} alt="Delete" className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 w-full sm:w-auto">
            {/* color */}
            <div className="col-span-3 sm:col-span-1 md:col-span-1">
              <label
                htmlFor={`color-${item.name}`}
                className="text-sm font-medium text-gray-700 block mb-1"
              >
                Color
              </label>
              <SelectBox type="color" name={item.name} items={item.colors} />
            </div>
            {/* size */}
            <div className="col-span-1 sm:col-span-1 md:col-span-1">
              <label
                htmlFor={`size-${item.name}`}
                className="text-sm font-medium text-gray-700 block mb-1"
              >
                Size
              </label>
              <SelectBox type="size" name={item.name} items={item.sizes} />
            </div>
            {/* qty */}
            <div className="col-span-1 sm:col-span-1 md:col-span-1">
              <label
                htmlFor={`quantity-${item.name}`}
                className="text-sm font-medium text-gray-700 block mb-1"
              >
                Qty.
              </label>
              <SelectBox
                type="quantity"
                name={item.name}
                items={[1, 2, 3, 4, 5]}
              />
            </div>
          </div>
          <div className="flex justify-end sm:justify-start items-center">
            <span className="font-semibold text-lg">
              THB {item.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

// ({
//     image,
//     name,
//     colors,
//     sizes,
//     defaultColor,
//     defaultSize,
//     defaultQuantity,
//     price,
//   })
CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
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
