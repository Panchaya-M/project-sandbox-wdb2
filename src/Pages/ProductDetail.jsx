/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../api";

import DefaultLayout from "../Components/Layouts/DefaultLayout";
import { Button, Ratings, SecondaryButton } from "../Components";

import Heart from "../assets/heart.svg";
import Arrow from "../assets/arrow_down.svg";

// Define the custom size order
const sizeOrder = ["S", "M", "L", "XL"];

// Sort the variants by size using the custom order
const sortedVariantBySize = variants => {
  return variants.sort(
    (a, b) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size)
  );
};

const quantityOptions = [
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
];

const PriceDisplay = ({
  price,
  promotionPrice,
  isPromotion = false,
  isOutOfStock = false,
}) => {
  const formatPrice = value => {
    return Number(value)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };
  return (
    <div className="mb-6">
      <div>
        <span
          className={`text-h4Bold ${
            isPromotion ? "text-white bg-danger px-2 py-2.5" : "text-black-900"
          }`}
        >
          THB {formatPrice(promotionPrice)}
        </span>
      </div>

      {isOutOfStock ? (
        <div className="text-danger text-h6Bold mt-2">
          Out of Stock
        </div>
      ) : isPromotion ? (
        <div className="text-black-900 text-subHeading mt-4">
          From <del>THB {formatPrice(price)}</del>
        </div>
      ) : null}

      {isPromotion ? (
        <div className="text-black-900 text-subHeading mt-4">
          From <del>THB {formatPrice(price)}</del>
        </div>
      ) : null}
    </div>
  );
};

const VariantSection = ({ sectionName, customGap, children }) => {
  return (
    <div className="mb-6">
      <p className="text-bodyText text-black-700 mb-2">{sectionName}</p>
      <div className={`flex items-center ${customGap ? customGap : "gap-2"}`}>
        {children}
      </div>
    </div>
  );
};

function ProductDetail() {
  const { permalink } = useParams();
  const [product, setProduct] = useState(null);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const [productColors, setProductColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [isOpenQtyOptions, setIsOpenQtyOptions] = useState(false);

  const [groupedValiantByColor, setGroupedValiantByColor] = useState(null);

  useEffect(() => {
    _getProductDetail();
  }, []);

  useEffect(() => {
    // Use an object to track unique colors with their color codes
    const uniqueColors = {};
    product?.variants?.forEach(item => {
      if (!uniqueColors[item.color]) {
        uniqueColors[item.color] = item.colorCode;
      }
    });

    const colors = Object.entries(uniqueColors).map(([color, colorCode]) => ({
      color,
      colorCode,
    }));
    if (colors.length === 0) {
      return;
    }

    setProductColors(colors ?? []);
    setSelectedColor(colors[0].color);

    const checkRemains = product?.variants.every(item => item.remains === 0);
    setIsOutOfStock(checkRemains);
  }, [product]);

  useEffect(() => {
    const groupedValiant = product?.variants.reduce((acc, item) => {
      if (!acc[item.color]) {
        acc[item.color] = {
          colorCode: item.colorCode,
          items: [],
        };
      }
      acc[item.color].items.push(item);
      return acc;
    }, {});

    setGroupedValiantByColor(groupedValiant);
  }, [selectedColor]);

  async function _getProductDetail() {
    const result = await getProductDetail(permalink);

    setProduct(result);
  }

  return (
    <DefaultLayout>
      {product && (
        <div className="container mx-auto mt-20 flex flex-col md:flex-row gap-10">
          <div className="flex-1">Carousel</div>

          {/* Product Detail */}
          <div className="flex-1 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-h6Bold text-black-900">
                {product.skuCode}
              </span>
              <img src={Heart} alt="heart" />
            </div>
            <h3 className="text-h3Bold text-black-900 mb-4">{product.name}</h3>
            <p className="text-h6Bold text-black-700 mb-6">
              {product.description}
            </p>

            {/* price */}
            <PriceDisplay
              price={product.price}
              promotionPrice={product.promotionalPrice}
              isPromotion={product.promotionalPrice < product.price}
              isOutOfStock={isOutOfStock}
            />

            {/* rating */}
            <div className="mb-6">
              <Ratings rating={product.ratings} />
            </div>

            {/* colors */}
            <VariantSection sectionName="Color" customGap="gap-12">
              {productColors.length > 0 &&
                productColors.map(color => (
                  <div
                    key={color.color}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <SecondaryButton
                      type="button"
                      customClassName={`w-[54px] h-[54px]`}
                      customStyle={{ backgroundColor: color.colorCode }}
                      onClick={() => {
                        setSelectedColor(color.color);
                        setSelectedProduct(null);
                      }}
                      disabled={isOutOfStock}
                      active={selectedColor === color.color}
                    />
                    <p className="text-bodyText text-black-900">
                      {color.color}
                    </p>
                  </div>
                ))}
            </VariantSection>

            {/* sizes */}
            <VariantSection sectionName="Size">
              {groupedValiantByColor &&
                sortedVariantBySize(
                  groupedValiantByColor[selectedColor].items
                ).map((variant, index) => (
                  <SecondaryButton
                    key={index}
                    text={variant.size || "Free Size"}
                    customClassName={`flex-1 max-w-[107px]`}
                    onClick={() => {
                      setSelectedProduct(variant);
                      if (quantity === 0) {
                        setQuantity(1);
                      }
                    }}
                    disabled={variant.remains === 0 || isOutOfStock}
                    active={selectedProduct?.size === variant?.size}
                  />
                ))}
            </VariantSection>

            {/* Quantity */}
            <VariantSection sectionName="Qty.">
              <div className="w-1/4 pr-2 relative">
                <SecondaryButton
                  text={isOutOfStock ? "Out of Stock" : quantity}
                  icon={Arrow}
                  onClick={() => setIsOpenQtyOptions(!isOpenQtyOptions)}
                  customClassName="w-full"
                  customStyle={{
                    justifyContent: "space-between",
                    paddingRight: "20px",
                  }}
                  customIconStyle={{ width: "14px" }}
                  disabled={
                    !selectedProduct ||
                    selectedProduct?.remains === 0 ||
                    isOutOfStock
                  }
                />

                {/* Quantity options */}
                <div
                  className={`absolute w-full top-[100%] right-1 grid whitespace-nowrap mt-1 border border-grey-300 bg-white z-10 ${
                    isOpenQtyOptions ? "" : "hidden"
                  }`}
                >
                  {quantityOptions.map(option => {
                    return (
                      selectedProduct?.remains >= option.value && (
                        <button
                          key={`qty-option-${option.value}`}
                          className={`w-full flex justify-start items-center gap-x-4 px-6 py-2 hover:bg-[#F2F2F2] ${
                            quantity === option.value ? "bg-limeGreen" : ""
                          }`}
                          onClick={() => {
                            setQuantity(option.value);
                            setIsOpenQtyOptions(false);
                          }}
                        >
                          <span className="text-sm">{option.name}</span>
                        </button>
                      )
                    );
                  })}
                </div>
              </div>
              {selectedProduct?.remains <= 3 && (
                <span className="text-danger">
                  Only {selectedProduct?.remains} left!
                </span>
              )}
            </VariantSection>

            {/* Add to cart button */}
            <div className="mb-6">
              <div className="flex gap-2">
                <Button
                  text="Add to cart"
                  customClassName="flex-1"
                  onClick={() => console.log(selectedProduct)}
                  disabled={isOutOfStock}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default ProductDetail;
