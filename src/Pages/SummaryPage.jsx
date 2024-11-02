// import { Button } from "@/components/ui/button";
import Button, { ButtonCustom } from "../Components/UI/Button.jsx";
import ProductCard from "../Components/UI/ProductCard";
import Delete from "../assets/delete.svg";
import Arrow from "../assets/arrow_down.svg";
import CartItem, { CartEmpty } from "../Components/UI/CartItem.jsx";
import CartSummary, {
  CartSummaryEmpty,
} from "../Components/UI/CartSummary.jsx";
import RandomProducts from "../Components/UI/RandomProducts.jsx";
import { CartContext } from "../Components/contexts/CartContext.jsx";
import { useEffect, useContext, useState } from "react";
import { getCartById, getProductDetail } from "../api.js";
import CartSkeleton from "../Components/UI/CartSkeleton.jsx";
import { removeItemFromCart } from "../api.js";

const VariantSection = ({ children, isEmpty }) => {
  return (
    <div
      className={`flex flex-col xxl:w-[944px] xl:w-[712px]  md:w-2/3  bg-white ${
        isEmpty ? "xxl:h-[838px] xl:h-[725px]" : "h-full space-y-6"
      }`}
    >
      <p className="text-h6Bold mt-6 ml-6 mb-6 w-fit">Items</p>
      {children}
    </div>
  );
};

export default function SummaryPage() {
  const isEmpty = false;
  const { cartId, setMappedItem, setCartId, setInvisible } =
    useContext(CartContext);
  const [mappedProducts, setMappedProducts] = useState([]); // State to store the fetched product data
  const [isLoading, setIsLoading] = useState(true);
  const [groupedValiantByColor, setGroupedValiantByColor] = useState([]);

  const handleRemoveItem = async (itemId) => {
    const updatedProducts = mappedProducts.filter((item) => item.id !== itemId);
    setMappedProducts(updatedProducts);

    try {
      await removeItemFromCart(cartId, itemId);

      if (updatedProducts.length === 0) {
        setCartId(null);
        setMappedItem([]);
        setInvisible(true);
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      setMappedProducts([...mappedProducts]);
    }
  };

  const fetchCartData = async () => {
    setIsLoading(true);
    try {
      const cart = await getCartById(cartId);
      if (cart && Array.isArray(cart.items)) {
        const productPromises = cart.items.map((item) =>
          getProductDetail(item.productPermalink).then((productDetail) => {
            const defaultQuantity = item.quantity;
            const defaultSkuCode = item.skuCode;

            const matchingSku = productDetail.data.variants.find(
              (sku) => sku.skuCode === defaultSkuCode
            );

            const variants = productDetail.data.variants.map((variant) => ({
              skuCode: variant.skuCode,
              color: variant.color,
              size: variant.size,
              remains: variant.remains, // Add remains field to track availability
            }));
            return {
              id: item.id,
              name: productDetail.data.name,
              price: productDetail.data.price,
              image: productDetail.data.imageUrls[0],
              colors: [
                ...new Set(
                  productDetail.data.variants.map((variant) => variant.color)
                ),
              ],
              sizes: [
                ...new Set(
                  productDetail.data.variants.map((variant) => variant.size)
                ),
              ],
              quantities: [1, 2, 3, 4, 5],
              defaultColor: matchingSku ? matchingSku.color : null,
              defaultSize: matchingSku ? matchingSku.size : null,
              defaultQuantity: defaultQuantity,
              selectedColor: matchingSku ? matchingSku.color : null,
              selectedSize: matchingSku ? matchingSku.size : null,
              selectedQuantity: defaultQuantity,
              variants: variants,
            };
          })
        );

        const mappedProductsApi = await Promise.all(productPromises);

        setMappedProducts(mappedProductsApi);
        setMappedItem(mappedProductsApi);
      } else {
        setMappedProducts([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleUpdate = (id, field, value) => {
    setMappedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  if (isLoading) {
    return <CartSkeleton />;
  }

  return (
    <>
      <div className="bg-black-50 pb-24">
        <div className="container mx-auto  min-h-screen">
          <h1 className="text-h5Bold py-[41px] px-6 text-left">My cart</h1>
          <div className="flex flex-col md:flex-row  gap-8 ">
            <VariantSection>
              {mappedProducts.length === 0 ? (
                <CartEmpty />
              ) : (
                <div className="grid grid-cols-1 divide-y px-6">
                  {mappedProducts.map((item) => (
                    <CartItem
                      cartId={cartId}
                      onRemove={handleRemoveItem}
                      key={item.id}
                      item={item}
                      onQuantityChange={(quantity) => {
                        if (quantity === undefined) quantity = 0;
                        handleUpdate(item.id, "selectedQuantity", quantity);
                      }}
                    />
                  ))}
                </div>
              )}
            </VariantSection>

            {mappedProducts.length === 0 ? (
              <CartSummaryEmpty />
            ) : (
              <CartSummary items={mappedProducts} />
            )}
          </div>

          {/* Featured Products */}
          <div className="my-24">
            <p className="text-h5Bold">People also like these</p>
            <RandomProducts />
          </div>
        </div>
      </div>
    </>
  );
}
