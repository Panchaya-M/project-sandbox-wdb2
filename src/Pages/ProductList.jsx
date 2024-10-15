import { useState } from "react";
import { useParams } from "react-router-dom";

import DefaultLayout from "../Components/Layouts/DefaultLayout";
import Arrow from "../assets/arrow_down.svg";

const filterGroup = [
  {
    name: "Tops",
    items: [
      { name: "All items", link: "" },
      { name: "T-Shirts", link: "t-shirt" },
      { name: "Cardigans", link: "cardigans" },
      // { name: "Knitwear & Sweaters", link: "knitwear" },
      // { name: "Sweatshirts & Hoodies", link: "sweatshirt" },
      // { name: "Fleece", link: "fleece" },
    ],
    // name: "Bottoms",
    // items: [
    //   { name: "All items", link: "" },
    //   { name: "T-Shirts", link: "t-shirt" },
    // ],
  },
];

const Filter = () => {
  const [selected, setSelected] = useState("");

  const listFilterItem = (items) => {
    return items.map((item) => {
      return (
        <div
          key={`filter-item-${item.name}`}
          className={`${selected === item.name ? "bg-limeGreen" : ""} p-2.5`}
        >
          <p className="text-sm" onClick={() => setSelected(item.name)}>
            {item.name}
          </p>
        </div>
      );
    });
  };

  const listFilterGroup = () => {
    return filterGroup.map((group) => {
      return (
        <div key={`group-${group.name}`}>
          <div className="">
            <p className="text-lg font-semibold py-3">{group.name}</p>
          </div>
          <div className="">{listFilterItem(group.items)}</div>
        </div>
      );
    });
  };

  return <div>{listFilterGroup()}</div>;
};

const sortOptions = [
  { name: "Price - Low to High", value: "price-asc" },
  { name: "Price - High to Low", value: "price-desc" },
  { name: "Best seller", value: "best-seller" },
];

const Sort = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("price-asc");

  function onChangeSort(value) {
    setSelected(value);
    setIsOpen(false);

    if (
      props.onChangeSort !== undefined &&
      typeof props.onChangeSort === "function"
    ) {
      props.onChangeSort(value);
    }
  }

  return (
    <div className="flex flex-row justify-end relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`top-0 right-0 flex justify-between items-center px-2.5 py-4 border hover:border-limeGreen ${
          isOpen ? "border-limeGreen" : "border-transparent"
        }`}
      >
        <p className="text-sm">Sort by</p>
        <img src={Arrow} alt="Arrow Down" className="pl-5" />
      </button>

      <div
        className={`absolute top-[100%] right-0 grid whitespace-nowrap mt-1 p-6 gap-y-6 border border-grey-300 bg-white ${
          isOpen ? "" : "hidden"
        }`}
      >
        {sortOptions.map((option) => {
          return (
            <button key={`sort-option-${option.value}`} className="block w-full text-left flex justify-start items-center gap-x-4" onClick={() => onChangeSort(option.value)}>
              {/* radio button */}
              <div className="w-6 h-6 block bg-white border-2 border-limeGreen rounded-full overflow-hidden p-1 inline-block">
                { selected === option.value && (<div className="w-full h-full bg-limeGreen rounded-full"/>)}
                
              </div>

              <span className="text-sm">{option.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ProductListPage = () => {
  const params = useParams();
  const [sortBy, setSortBy] = useState("price-asc");

  return (
    <DefaultLayout>
      <div className="container mx-auto my-24">
        <div className="grid grid-cols-4 gap-x-10">
          <div className="col-span-1">
            {/* Filter */}
            <Filter />
          </div>

          <div className="md:col-span-3">
            <div className="grid grid-cols-5">
              <div className="md:col-span-4">
                <h1 className="text-3xl font-bold">Woman's Clothing</h1>
                <p>Sort by: {sortBy}</p>
              </div>
              <div className="md:col-span-1">
                <Sort
                  onChangeSort={(s) => {
                    setSortBy(s);
                  }}
                />
              </div>
            </div>

            {/* Products */}
            <div className="grid md:grid-cols-3 gap-x-10 gap-y-10 mt-10">
              <div className="">Product_1</div>
              <div className="">Product_1</div>
              <div className="">Product_1</div>
              <div className="">Product_1</div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductListPage;
