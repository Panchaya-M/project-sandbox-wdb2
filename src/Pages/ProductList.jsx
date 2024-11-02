import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Arrow from "../assets/arrow_down.svg";
import SortByIcon from "../assets/sortby.svg";
import {
  getAllCategory,
  getChildrenCategories,
  getCollections,
  getParentCategory,
  getProductByCategory,
} from "../api";
import { ProductCard } from "../Components";

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
const Filter = ({ items, onSelectFilter, selectedFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  // On select filter
  function onSelect(id, permalink, name) {
    // Redirect to category page
    if (typeof onSelectFilter === "function") {
      onSelectFilter(id, permalink, name);
    }
  }

  // List filter item
  const listFilterItem = (items) => {
    if (items === undefined || !isOpen) return;

    return items.map((item) => {
      return (
        <button
          key={`filter-item-${item.id}`}
          className={`${
            selectedFilter === item.permalink ? "bg-limeGreen" : ""
          } p-2.5 text-sm block w-full text-left`}
          onClick={() => onSelect(item.id, item.permalink, item.name)}
        >
          {item.name}
        </button>
      );
    });
  };

  // List filter group
  const listFilterGroup = () => {
    return items.map((item) => {
      return (
        <div key={`group-${item.name}`}>
          <div className="">
            <button
              className={`
                  flex w-full text-left text-lg font-semibold py-3 px-2
                  justify-between items-center
                  ${selectedFilter === item.id ? "bg-limeGreen" : ""}
                `}
              onClick={() => {
                if (item.children && item.children.length > 0) {
                  setIsOpen(!isOpen);
                } else {
                  item.permalink &&
                    item.id &&
                    onSelect(item.id, item.permalink, item.name);
                }
              }}
            >
              {item.name}
              {item.children && item.children.length > 0 && (
                <img
                  src={Arrow}
                  alt="Arrow Down"
                  className={`pl-4 relative transition-transform ${
                    isOpen ? "rotate-180 translate-x-4" : "rotate-0"
                  }`}
                />
              )}
            </button>
          </div>
          <div className="pl-2">{listFilterItem(item.children)}</div>
        </div>
      );
    });
  };

  // If items is undefined
  // Show loading
  if (items === undefined) {
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
  const oldSelected = useRef(selected);

  function applySort() {
    if (
      props.onChangeSort !== undefined &&
      typeof props.onChangeSort === "function"
    ) {
      props.onChangeSort(selected);
    }
    setIsOpen(false);
  }

  function onChangeSort(changeOnSelect = false, value) {
    setSelected(value);
    if (changeOnSelect) {
      applySort();
    }
  }

  function onReset() {
    setSelected("price-asc");
    // Need to close(?)
    // setIsOpen(false);

    if (
      props.onChangeSort !== undefined &&
      typeof props.onChangeSort === "function"
    ) {
      props.onChangeSort("price-asc");
    }
  }

  function listSortOptions(changeOnSelect = false) {
    return sortOptions.map((option) => {
      return (
        <button
          key={`sort-option-${option.value}`}
          className="block w-full text-left flex justify-start items-center gap-x-4"
          onClick={() => onChangeSort(changeOnSelect, option.value)}
        >
          {/* radio button */}
          <div className="w-6 h-6 block bg-white border-2 border-limeGreen rounded-full overflow-hidden p-1 inline-block">
            {selected === option.value && (
              <div className="w-full h-full bg-limeGreen rounded-full" />
            )}
          </div>

          <span className="text-sm">{option.name}</span>
        </button>
      );
    });
  }

  return (
    <div className="flex flex-row justify-end relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`top-0 right-0 flex justify-between items-center px-2.5 py-4 border hover:border-limeGreen ${
          isOpen ? "border-limeGreen" : "border-transparent"
        }`}
      >
        <p className="text-sm max-md:text-[18px]">Sort by</p>
        <img src={Arrow} alt="Arrow Down" className="pl-5 hidden md:block" />
        <img
          src={SortByIcon}
          alt="Arrow Down"
          className="pl-2 w-10 h-10 md:hidden"
        />
      </button>

      {/* Sort options */}
      <div
        className={`
          max-md:fixed max-md:bottom-0 max-md:left-0 max-md:w-full
          absolute md:top-[100%] md:right-0 z-[100]
          max-md:bg-black/50 max-md:h-full
          max-md:flex flex-col justify-end items-center
          ${isOpen ? "" : "max-md:hidden"}
        `}
      >
        <div
          className={`
            w-full grid whitespace-nowrap mt-1 p-6 gap-y-6 border border-grey-300 bg-white z-[100]
            max-md:rounded-t-2xl
            ${isOpen ? "" : "hidden"}
          `}
        >
          {/* Mobile: Sort by title, control bar */}
          <div className="md:hidden">
            <div className="grid grid-cols-3 text-md">
              <div className="col text-left">
                <button
                  className="text-info"
                  onClick={() => {
                    setSelected(oldSelected.current);
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className="col text-center font-semibold">
                <p className="font-">Sort by</p>
              </div>
              <div className="col text-right">
                <button className="text-info" onClick={onReset}>
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Sort options */}
          <div className="grid gap-y-4 md:hidden">{listSortOptions()}</div>

          <div className="grid gap-y-4 hidden md:grid">
            {listSortOptions(true)}
          </div>

          {/* Mobile: Apply sort buttons */}
          <div className="md:hidden mt-0">
            <button
              className="block w-full p-4 text-center bg-black text-white"
              onClick={applySort}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================================================================================================
// Main component
const ProductListPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [pageDetail, setPageDetail] = useState({ name: null, id: null });
  const [sortBy, setSortBy] = useState(["price", "asc"]);
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPermalink, setSelectedPermalink] = useState(null);

  const [selectedCollection, setSelectedCollection] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    setSelectedCategory(null);
    setSelectedPermalink(null);
    _getCollections();
  }, [params]);

  useEffect(() => {
    _getCategoryPageDetail();
  }, [sortBy, selectedPermalink, selectedCollection, params]);

  useEffect(() => {
    _getChildrenCategories();
    _getProductByCategory();
  }, [pageDetail]);

  useEffect(() => {
    setSelectedCollection(null);
  }, [params.category, params.subCategory]);

  // Create category list
  function createCategoryList(fetchedCategories) {
    let _categories = {};

    // Add to parent category
    function addToParentCategory(parentId, category) {
      if (!_categories[parentId]) {
        createParentCategory(parentId);
      }
      _categories[parentId].children.push(category);
    }

    // Create category
    function createCategory(category) {
      return {
        id: category.id,
        name: category.name,
        permalink: category.permalink,
      };
    }

    // Create parent category
    function createParentCategory(categoryId, category = {}) {
      _categories = {
        ..._categories,
        [categoryId]: {
          ...category,
          children: [],
        },
      };
    }

    // Create categories
    fetchedCategories.forEach((category) => {
      // Check if category is parent
      if (category.parentId === null) {
        createParentCategory(category.id, createCategory(category));
      } else {
        // Add to parent category
        addToParentCategory(category.parentId, createCategory(category));
      }
    });

    return _categories;
  }

  async function _getCategoryPageDetail() {
    const categories = await getAllCategory();
    const currentCategory = categories.find(
      (category) => category.permalink === params.category
    );

    if (currentCategory) {
      setPageDetail(currentCategory);
    }

    if (params.subCategory) {
      const subCategory = categories.find(
        (category) => category.permalink === params.subCategory
      );
      setSelectedPermalink(subCategory.permalink);
      setSelectedCategory(subCategory.name);
      setSelectedFilter(subCategory.id);
    } else {
      setSelectedFilter(currentCategory.id);
    }
  }

  async function _getProductByCategory() {
    setIsLoading(true);
    const result = await getProductByCategory(
      selectedCollection,
      selectedPermalink === null ? [params.category] : [selectedPermalink],
      sortBy[0],
      sortBy[1]
    );

    setProducts(result);
    setIsLoading(false);
  }

  async function _getChildrenCategories() {
    if (pageDetail.id !== null) {
      const categories = await getChildrenCategories(pageDetail.id);

      const categoriesList = createCategoryList(
        [{ ...pageDetail, name: "All products" }, ...categories].map(
          (category) => ({ ...category, parentId: null })
        )
      );
      setCategories(categoriesList);
    }
  }

  async function _getCollections() {
    const result = await getCollections();

    setCollections([{ id: "", name: "Collections", children: result }]);
  }

  function onSelectFilter(id, permalink, categoryName) {
    setSelectedFilter(id);
    setSelectedPermalink(permalink, categoryName);

    if (permalink === pageDetail.permalink) {
      navigate(`/products/${permalink}`);
      // setSelectedCategory(null);
    } else {
      navigate(`/products/${params.category}/${permalink}`);
      // setSelectedCategory(categoryName);
    }
  }

  function onSort(sortBy) {
    switch (sortBy) {
      case "price-asc":
        setSortBy(["price", "asc"]);
        break;
      case "price-desc":
        setSortBy(["price", "desc"]);
        break;
      case "best-seller":
        setSortBy(["ratings", "desc"]);
        break;
    }
  }

  function renderHeadingTitle() {
    const mainPageName = checkYourGrammarChangeFromPruralToSingular(
      pageDetail.name
    );
    if (mainPageName === null) {
      return "Loading...";
    }

    if (selectedCategory === null) {
      return `${mainPageName}`;
    }

    return `${mainPageName}'s ${selectedCategory}`;
  }

  function checkYourGrammarChangeFromPruralToSingular(text) {
    switch (text) {
      case "Ladies":
        return "Lady";
      case "Men":
        return "Man";
      case "Kids":
        return "Kid";
      case "Accessories":
        return "Accessory";
      case "Women":
        return "Woman";
      default:
        return text;
    }
  }

  return (
    <>
      <div className="container mx-auto max-md:mt-6 my-24">
        <div className="grid grid-cols-4 gap-x-10">
          <div className="col-span-1 max-md:hidden">
            {/* Filter */}
            <Filter
              items={Object.values(categories)}
              onSelectFilter={onSelectFilter}
              selectedFilter={selectedFilter}
            />

            <Filter
              items={collections}
              onSelectFilter={(id, permalink, name) => {
                setSelectedCollection(permalink);
              }}
              selectedFilter={selectedCollection}
            />
          </div>

          <div className="md:col-span-3 col-span-full">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-4 flex justify-start items-center">
                <h1 className="text-3xl font-bold">{renderHeadingTitle()}</h1>
              </div>
              <div className="md:col-span-1 text-right flex justify-end items-center">
                <Sort onChangeSort={onSort} />
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 mt-10 relative">
              {isLoading && (
                <div className="bg-black/50 w-full h-full absolute z-10 backdrop-blur-md p-4 min-h-16 col-span-full">
                  <p className="text-center text-white font-bold animate-pulse">
                    Loading products...
                  </p>
                </div>
              )}

              {products.length === 0 && !isLoading && (
                <div className="col-span-1">
                  <p className="text-center">No products found</p>
                </div>
              )}
              {products.map((product) => (
                <div className="col-span-1">
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    description={product.description}
                    image={
                      product.imageUrls.length > 0 ? product.imageUrls[0] : ""
                    }
                    rating={product.ratings}
                    price={product.price}
                    promotionPrice={
                      product.promotionalPrice !== undefined
                        ? product.promotionalPrice
                        : 0
                    }
                    isPromotion={product.promotionalPrice !== product.price}
                    permalink={product.permalink}
                    // price={390}
                    // promotionPrice={290}
                    // isPromotion={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListPage;
