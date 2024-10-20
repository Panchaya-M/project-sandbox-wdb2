import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DefaultLayout from "../Components/Layouts/DefaultLayout";
import Arrow from "../assets/arrow_down.svg";
import {getAllCategory, getProductByCategory} from '../api';
import {ProductCard} from '../Components';

/**
 * 
 * @param { categories: {
 *  name: string,
 *  permalink: string
 *   children: {
 *    id: string,
 *    name: string,
 *    permalink: string
 *  }[]
 * }[]
 * } props
 * 
 * @param (permalink: string) onSelectFilter
 * @returns 
 */
const Filter = ({ categories, onSelectFilter }) => {
  const [selected, setSelected] = useState("");

  // On select filter
  function onSelect(id, permalink) {
    setSelected(id);

    // Redirect to category page
    if (typeof onSelectFilter === "function") {
      onSelectFilter(permalink);
    }
  }

  // List filter item
  const listFilterItem = (items) => {
    return items.map((item) => {
      return (
        <button
          key={`filter-item-${item.id}`}
          className={`${selected === item.id ? "bg-limeGreen" : ""} p-2.5 text-sm block w-full text-left`}
          onClick={() => onSelect(item.id, item.permalink)}
        >
          {item.name}
        </button>
      );
    });
  };

  // List filter group
  const listFilterGroup = () => {
    return categories.map((category) => {
      return (
        <div key={`group-${category.name}`}>
          <div className="">
            <p className="text-lg font-semibold py-3">{category.name}</p>
          </div>
          <div className="">{listFilterItem(category.children)}</div>
        </div>
      );
    });
  };

  // If categories is undefined
  // Show loading
  if (categories === undefined) {
    return <div>Loading...</div>;
  }

  // Otherwise, show filter
  return <div>{listFilterGroup()}</div>;
};

const sortOptions = [
  { name: "Price - Low to High", value: "price-asc" },
  { name: "Price - High to Low", value: "price-desc" },
  { name: "Best seller", value: "best-seller" },
];

/**
 * 
 * @param {onChangeSort: (value: string) => void} props
 * @returns
  */
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

      {/* Sort options */}
      <div
        className={`absolute top-[100%] right-0 grid whitespace-nowrap mt-1 p-6 gap-y-6 border border-grey-300 bg-white z-10 ${
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

// ========================================================================================================
// Main component
const ProductListPage = () => {
  const params = useParams();
  const [sortBy, setSortBy] = useState(["price", "asc"]);
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState([]);

  const [selectedPermalink, setSelectedPermalink] = useState(null);

  useEffect(() => {
    _getAllCategories()
    _getProductByCategory()
  }, [sortBy, selectedPermalink])

  // Create category list
  function createCategoryList(fetchedCategories) {
    let _categories = {}

    // Add to parent category
    function addToParentCategory(parentId, category) {
      if (!_categories[parentId]) {
        createParentCategory(parentId)
      }
      _categories[parentId].children.push(category)
    }

    // Create category
    function createCategory(category) {
      return {
        id: category.id,
        name: category.name,
        permalink: category.permalink,
      }
    }

    // Create parent category
    function createParentCategory(categoryId, category = {}) {
      _categories = {
        ..._categories,
        [categoryId]: {
          ...category,
          children: [],
        }
      }
    }

    // Create categories
    fetchedCategories.forEach((category) => {
      // Check if category is parent
      if (category.parentId === null) {
        createParentCategory(category.id, createCategory(category))
      } else {
        // Add to parent category
        addToParentCategory(category.parentId, createCategory(category))
      }
    })

    return _categories;
  }

  async function _getAllCategories() {
    const result = await getAllCategory()

    setCategories(createCategoryList(result))
  }

  async function _getProductByCategory() {
    const result = await getProductByCategory(selectedPermalink === null ? [] : [selectedPermalink], sortBy[0], sortBy[1])
    
    setProducts(result)
  }

  function onSelectFilter(permalink) {
    setSelectedPermalink(permalink)
  }

  function onSort(sortBy) {
    switch (sortBy) {
      case "price-asc":
        setSortBy(["price", "asc"])
        break
      case "price-desc":
        setSortBy(["price", "desc"])
        break
      case "best-seller":
        // setSortField("best-seller")
        break
    }
  }

  return (
    <>
      <div className="container mx-auto my-24">
        <div className="grid grid-cols-4 gap-x-10">
          <div className="col-span-1">
            {/* Filter */}
            <Filter categories={Object.values(categories)} onSelectFilter={onSelectFilter} />
          </div>

          <div className="md:col-span-3">
            <div className="grid grid-cols-5">
              <div className="md:col-span-4">
                <h1 className="text-3xl font-bold">Woman's Clothing</h1>
                <p>Sort by: {sortBy}</p>
              </div>
              <div className="md:col-span-1">
                <Sort
                  onChangeSort={(sort) => {
                    onSort(sort)
                  }}
                />
              </div>
            </div>

            {/* Products */}
            <div className="grid md:grid-cols-3 gap-x-10 gap-y-10 mt-10">
              {
                products.map((product) => (
                  <ProductCard
                    name={product.name}
                    description={product.description}
                    image={product.imageUrls.length > 0 ? product.imageUrls[0] : ''}
                    rating={product.ratings}
                    price={product.price}
                    promotionPrice={product.promotionalPrice !== undefined ? product.promotionalPrice : 0}
                    isPromotion={product.promotionalPrice !== undefined}
                    permalink={product.permalink}
                    // price={390}
                    // promotionPrice={290}
                    // isPromotion={true}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListPage;
