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
  return (
    <>
      <div className="bg-black-50 pb-24">
        <div className="container mx-auto  min-h-screen">
          <h1 className="text-h5Bold py-[41px] px-6 text-left">My cart</h1>
          <div className="flex flex-col md:flex-row  gap-8 ">
            <VariantSection>
              {isEmpty ? (
                <CartEmpty />
              ) : (
                <div className="grid grid-cols-1 divide-y px-6">
                  {/* <CartItem
                    image="https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2FdBt7jOQ9qnKvs8aWrxb5%2F_images%2FtrWAP3Q0eBJTUjhmP683-Gemini%20Generated%20(8).jpeg?alt=media&token=cf7b47de-a656-4608-98a7-96a6b0cc7a2c"
                    name="Reyon Long Sleeve Shirt"
                    colors={["Blue", "Red", "Green"]}
                    sizes={["S", "M", "L", "XL"]}
                    defaultColor="Blue"
                    defaultSize="M"
                    defaultQuantity={2}
                    price={2000.0}
                  />
                  <CartItem
                    image="https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2FdBt7jOQ9qnKvs8aWrxb5%2F_images%2FtrWAP3Q0eBJTUjhmP683-Gemini%20Generated%20(8).jpeg?alt=media&token=cf7b47de-a656-4608-98a7-96a6b0cc7a2c"
                    name="Flexi Move Sneaker"
                    colors={["Trio", "Black", "White"]}
                    sizes={["38", "39", "40", "41", "42"]}
                    defaultColor="Trio"
                    defaultSize="40"
                    defaultQuantity={1}
                    price={17000.0}
                  /> */}
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </VariantSection>

            {isEmpty ? <CartSummaryEmpty /> : <CartSummary items={cartItems} />}
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
