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

const cartItems = [
  {
    id: 1,
    name: "Reyon Long Sleeve Shirt",
    price: 2000.0,
    image:
      "https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    colors: ["Blue", "Red", "Green"],
    sizes: ["M"],
    quantities: [1, 2, 3],
    defaultColor: "Blue",
    defaultSize: "M",
    defaultQuantity: 2,
  },
  {
    id: 2,
    name: "Flexi Move Sneaker",
    price: 1700.0,
    image:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    colors: ["Trio", "Black", "White"],
    sizes: ["40"],
    quantities: [1, 2, 3],
    defaultColor: "Blue",
    defaultSize: "M",
    defaultQuantity: 2,
  },
];

export default function SummaryPage() {
  const isEmpty = false;
  const { cartId } = useContext(CartContext);
  const [mappedProducts, setMappedProducts] = useState([]); // State to store the fetched product data
  const [isLoading, setIsLoading] = useState(true);

  const pojorOnclick = async () => {
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
            console.log("ideee", productDetail.data.id);
            return {
              id: productDetail.data.id,
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
            };
          })
        );

        setMappedProducts(await Promise.all(productPromises));
        console.log("mappedProducts api", mappedProducts);
      } else {
        setMappedProducts([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect to run pojorOnclick on the first render
  useEffect(() => {
    pojorOnclick();
  }, []);

  const handleUpdate = (id, field, value) => {
    console.log(id, field, value);

    setMappedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
    console.log("mappedProducts after ", mappedProducts);
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
                      key={item.id}
                      item={item}
                      onColorChange={(color) =>
                        handleUpdate(item.id, "selectedColor", color)
                      }
                      onSizeChange={(size) =>
                        handleUpdate(item.id, "selectedSize", size)
                      }
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
