/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAlert from "../hooks/useAlert";
import { Link, useParams } from "react-router-dom";
import {
  addProductToExistingCart,
  createNewCart,
  getProductDetail,
} from "../api";
import { Button, Ratings, SecondaryButton } from "../Components";
import Modal from "../Components/UI/Modal";
import Heart from "../assets/heart.svg";
import Arrow from "../assets/arrow_down.svg";
import Loading from "../Components/UI/Loading";
import ProductGallery from "../Components/UI/ProductGallery";
import { useContext } from "react";
import { CartContext } from "../Components/contexts/CartContext";
import RandomProducts from "../Components/UI/RandomProducts";

// Define the custom size order
const sizeOrder = ["S", "M", "L", "XL"];

// Sort the variants by size using the custom order
const sortedVariantBySize = (variants) => {
  return variants?.sort(
    (a, b) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size)
  );
};

const formatPrice = (value) => {
  return Number(value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
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
  return (
    <div className="mb-6">
      <div>
        <span
          className={`text-h4Bold ${
            isPromotion && !isOutOfStock
              ? "text-white bg-danger px-2 py-2.5"
              : "text-black-900"
          }`}
        >
          THB {formatPrice(promotionPrice)}
        </span>
      </div>

      {isOutOfStock ? (
        <div className="text-danger text-h6Bold mt-2">Out of Stock</div>
      ) : isPromotion ? (
        <div className="text-black-900 text-subHeading mt-4">
          From <del>THB {formatPrice(price)}</del>
        </div>
      ) : null}
    </div>
  );
};

const Options = ({ sectionName, customGap, children }) => {
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
  const alert = useAlert();
  const { permalink } = useParams();
  const { cartId, setCartId } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [groupedValiantByColor, setGroupedValiantByColor] = useState(null);
  const [productColors, setProductColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [isOpenQtyOptions, setIsOpenQtyOptions] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [isOpenAddedToCartModal, setIsOpenAddedToCartModal] = useState(false);

  useEffect(() => {
    setProduct(null);
    _getProductDetail();
  }, [permalink]);

  useEffect(() => {
    const uniqueColors = {};
    product?.variants?.forEach((item) => {
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

    setProductColors(colors);
    setSelectedColor(colors[0].color);

    const checkRemains = product?.variants.every((item) => item.remains === 0);
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

  const openAddedToCartModal = () => {
    setIsOpenAddedToCartModal(true);
  };

  const closeAddedToCartModal = () => {
    setIsOpenAddedToCartModal(false);
  };

  const handleAddToCartButton = () => {
    if (!selectedProduct) {
      alert.warning("Please select size.");
      return;
    }
    _addProductToCart();
  };

  async function _getProductDetail() {
    try {
      const result = await getProductDetail(permalink);
      setProduct(result.data);
    } catch (error) {
      alert.error(error.response.data.message);
    }
  }

  async function _addProductToCart() {
    try {
      const params = {
        items: [
          {
            skuCode: selectedProduct.skuCode,
            quantity: quantity,
          },
        ],
      };
      if (cartId) {
        await addProductToExistingCart(cartId, params);
      } else {
        const result = await createNewCart(params);
        setCartId(result.data.id);
      }
      openAddedToCartModal();
    } catch (error) {
      alert.error(error.response.data.message);
    }
  }

  return (
    <>
      {product ? (
        <>
          <div className="container mx-auto mt-6 xxl:mt-20 flex flex-col lg:flex-row gap-10 mb-12">
            <div className="flex-1">
              <ProductGallery
                imageUrls={product.imageUrls}
                isOutOfStock={isOutOfStock}
                price={product.price}
                promotionPrice={product.promotionalPrice}
                isPromotion={product.promotionalPrice < product.price}
              />
            </div>

            {/* Product Detail */}
            <div className="flex-1 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-h6Bold text-black-900">
                  {product.skuCode}
                </span>
                <img src={Heart} alt="heart" />
              </div>
              <h3 className="text-h3Bold text-black-900 mb-4">
                {product.name}
              </h3>
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
              <Options sectionName="Color" customGap="gap-12">
                {productColors.length > 0 &&
                  productColors.map((color) => (
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
              </Options>

              {/* sizes */}
              <Options sectionName="Size">
                {groupedValiantByColor &&
                  sortedVariantBySize(
                    groupedValiantByColor[selectedColor]?.items
                  )?.map((variant, index) => (
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
              </Options>

              {/* Quantity */}
              <Options sectionName="Qty.">
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
                    {quantityOptions.map((option) => {
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
              </Options>

              {/* Add to cart button */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <Button
                    text="Add to cart"
                    customClassName="flex-1"
                    onClick={handleAddToCartButton}
                    disabled={isOutOfStock}
                  />
                </div>
              </div>

              {isOpenAddedToCartModal && (
                <Modal
                  header="Items added to your cart"
                  footer={
                    <div className="flex gap-4">
                      <Link to="/summary" className="flex-1">
                        <Button
                          text="View cart"
                          customClassName="w-full h-full"
                        />
                      </Link>
                      <SecondaryButton
                        text="Continue shopping"
                        customClassName="flex-1"
                        onClick={closeAddedToCartModal}
                      />
                    </div>
                  }
                  closeModal={closeAddedToCartModal}
                >
                  <div className="flex items-center gap-10">
                    <img
                      src={product.imageUrls[0]}
                      alt={product.name}
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="w-full">
                      <div className="flex justify-between items-center">
                        <h6 className="text-h6Bold">{product.name}</h6>
                        <p className="text-h6Bold">
                          THB {formatPrice(product.promotionalPrice * quantity)}
                        </p>
                      </div>
                      <p className="text-subHeading text-black-700">
                        QTY : {quantity}
                      </p>
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          </div>

          <RandomProducts
            header="People also like these"
            headerAlign="left"
            excludeId={product?.id}
            category={product?.categories?.[0]}
          />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default ProductDetail;
