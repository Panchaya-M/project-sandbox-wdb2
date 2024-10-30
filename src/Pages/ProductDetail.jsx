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
import Loading from "../Components/UI/Loading";
import ProductGallery from "../Components/UI/ProductGallery";
import { useContext } from "react";
import { CartContext } from "../Components/contexts/CartContext";
import RandomProducts from "../Components/UI/RandomProducts";
import Dropdown from "../Components/UI/Dropdown";

const qtyOptions = [1, 2, 3, 4, 5];

// Define the custom size order
const sizeOrder = ["S", "M", "L", "XL"];

// Sort the variants by size using the custom order
const sortedVariantBySize = (variants = []) => {
  if (sizeOrder.includes(variants[0]?.size)) {
    return variants?.sort(
      (a, b) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size)
    );
  }

  return variants?.sort((a, b) => a.size - b.size);
};

const formatPrice = (value) => {
  return Number(value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

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
  const [productNoSize, setProductNoSize] = useState(false);
  const [groupedValiantByColor, setGroupedValiantByColor] = useState(null);
  const [productColors, setProductColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [quantityOptions, setQuantityOptions] = useState(qtyOptions);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [isOpenAddedToCartModal, setIsOpenAddedToCartModal] = useState(false);

  useEffect(() => {
    setProduct(null);
    setSelectedProduct(null);
    setProductNoSize(false);
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

    if (product.variants.length === 1 && !product.variants[0]?.size) {
      setProductNoSize(true);
      setSelectedProduct(product.variants[0]);
    }

    const checkRemains = product?.variants.every((item) => item.remains === 0);
    setIsOutOfStock(checkRemains);
  }, [product]);

  useEffect(() => {
    if (isOutOfStock) {
      setQuantity("Out of Stock");
    }
  }, [isOutOfStock]);

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

  useEffect(() => {
    const remains = selectedProduct?.remains;
    if (remains >= 5) {
      setQuantityOptions(qtyOptions);
    } else {
      setQuantityOptions(qtyOptions.slice(0, remains));
    }
    setQuantity(1);
  }, [selectedProduct]);

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
    console.log("in api >> ", cartId);

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
              {!productNoSize && (
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
                        }}
                        disabled={variant.remains === 0 || isOutOfStock}
                        active={selectedProduct?.size === variant?.size}
                      />
                    ))}
                </Options>
              )}

              {/* Quantity */}
              <Options sectionName="Qty.">
                <Dropdown
                  width={isOutOfStock ? "30%" : "25%"}
                  options={quantityOptions}
                  disabled={
                    !selectedProduct ||
                    selectedProduct?.remains === 0 ||
                    isOutOfStock
                  }
                  selectedItem={quantity}
                  setSelectedItem={(e) => setQuantity(e)}
                />
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
