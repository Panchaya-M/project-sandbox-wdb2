import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DefaultLayout from "../Components/Layouts/DefaultLayout";
import Arrow from "../assets/arrow_down.svg";
import { getAllCategory, getChildrenCategories, getParentCategory, getProductByCategory } from "../api";
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
const Filter = ({ categories, onSelectFilter }) => {
  const [selected, setSelected] = useState("");

  // On select filter
  function onSelect(id, permalink, name) {
    setSelected(id);

    // Redirect to category page
    if (typeof onSelectFilter === "function") {
      onSelectFilter(permalink, name);
    }
  }

  // List filter item
  const listFilterItem = (items) => {
    return items.map((item) => {
      return (
        <button
          key={`filter-item-${item.id}`}
          className={`${
            selected === item.id ? "bg-limeGreen" : ""
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
    return categories.map((category) => {
      return (
        <div key={`group-${category.name}`}>
          <div className="">
            <button
              className={`
                  block w-full text-left text-lg font-semibold py-3
                  ${selected === category.id ? "bg-limeGreen" : ""}
                `}

              onClick={() => category.permalink && category.id && onSelect(category.id, category.permalink, category.name)}
            >
              {category.name}
            </button>
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
                <button className="text-info" onClick={() => setIsOpen(false)}>Cancel</button>
              </div>
              <div className="col text-center font-semibold">
                <p className="font-">
                  Sort by
                </p>
              </div>
              <div className="col text-right">
                <button className="text-info" onClick={onReset}>Reset</button>
              </div>
            </div>
          </div>

          {/* Sort options */}
          <div className="grid gap-y-4">
            {sortOptions.map((option) => {
              return (
                <button
                  key={`sort-option-${option.value}`}
                  className="block w-full text-left flex justify-start items-center gap-x-4"
                  onClick={() => onChangeSort(option.value)}
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
            })}
          </div>

          {/* Mobile: Apply sort buttons */}
          <div className="md:hidden mt-0">
            <button className="block w-full p-4 text-center bg-black text-white">Apply</button>
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
  const [pageDetail, setPageDetail] = useState({ name: null, id: null });
  const [sortBy, setSortBy] = useState(["price", "asc"]);
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPermalink, setSelectedPermalink] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSelectedCategory(null);
    setSelectedPermalink(null);
  }, [params])

  useEffect(() => {
    _getCategoryPageDetail();
  }, [sortBy, selectedPermalink, params]);

  useEffect(() => {
    _getChildrenCategories();
    _getProductByCategory();
  }, [pageDetail]);

  // Create category list
  function createCategoryList(fetchedCategories) {
    console.log('fetchedCategories', fetchedCategories);
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
    const categories = await getParentCategory();
    const currentCategory = categories.find(category => category.permalink === params.category);

    if (currentCategory) {
      setPageDetail(currentCategory);
    }
  }

  // async function _getAllCategories() {
  //   const result = await getAllCategory();

  //   setCategories(createCategoryList(result));
  // }

  async function _getProductByCategory() {
    setIsLoading(true);
    const result = await getProductByCategory(
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
        [{ ...pageDetail, name: 'All products' }, ...categories]
          .map((category) => ({ ...category, parentId: null }))
      );
      setCategories(categoriesList);
    }
  }

  function onSelectFilter(permalink, categoryName) {
    setSelectedPermalink(permalink, categoryName);
    
    if (permalink === pageDetail.permalink) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryName);
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
    if (pageDetail.name === null) {
      return "Loading...";
    }

    if (selectedCategory === null) {
      return `${pageDetail.name}`;
    }

    return `${pageDetail.name}'s ${selectedCategory}`;
  }

  return (
    <>
      <div className="container mx-auto my-24">
        <div className="grid grid-cols-4 gap-x-10">
          <div className="col-span-1 max-md:hidden">
            {/* Filter */}
            <Filter
              categories={Object.values(categories)}
              onSelectFilter={onSelectFilter}
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
              
              {
                isLoading && (
                  <div className="bg-black/50 w-full h-full absolute z-10 backdrop-blur-md p-4 min-h-16 col-span-full">
                      <p className="text-center text-white font-bold animate-pulse">Loading products...</p>
                  </div>
                )
              }

              {
                products.map((product) => (
                  <div className="col-span-1">
                    <ProductCard
                      key={product.id}
                      name={product.name}
                      description={product.description}
                      image={product.imageUrls.length > 0 ? product.imageUrls[0] : ''}
                      rating={product.ratings}
                      price={product.price}
                      promotionPrice={product.promotionalPrice !== undefined ? product.promotionalPrice : 0}
                      isPromotion={product.promotionalPrice !== product.price}
                      permalink={product.permalink}
                      // price={390}
                      // promotionPrice={290}
                      // isPromotion={true}
                    />
                  </div>
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
