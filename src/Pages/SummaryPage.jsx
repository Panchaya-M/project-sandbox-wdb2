// import { Button } from "@/components/ui/button";
import CardEmpty from "../assets/images/empty_cart.png";

// function ItemContainer() {
//   return (
//     <div className="w-full md:w-2/3">
//       <h2 className="text-xl font-semibold mb-4">Items</h2>
//       <div className="bg-gray-100 rounded-lg p-8 text-center">
//         <div className="mb-4">
//           <img className="mx-auto h-24 w-24 text-gray-400" />
//         </div>
//         <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
//         <p className="text-gray-600 mb-4">
//           Looks like you have not added anything to your cart.
//           <br />
//           Go ahead & explore top categories.
//         </p>
//         <button variant="default">Continue shopping</button>
//       </div>
//     </div>
//   );
// }

function ItemContainer() {
  return (
    <div className="flex flex-col  w-full md:w-2/3  bg-white">
      <p className="text-h6Bold pt-[24px] pl-[24px]">Items</p>
      <div id="cart-part" className="text-center  items-center">
        <div className="mb-6 opacity-50">
          {/* Add your image or SVG here */}
          <img src={CardEmpty} alt="Empty Cart" className="mx-auto w-40" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">
          Looks like you have not added anything to your cart.
          <br />
          Go ahead & explore top categories.
        </p>
        <button className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition duration-200">
          Continue shopping
        </button>
      </div>
    </div>
  );
}

function CartSummary() {
  return (
    <div className="w-full md:w-1/3">
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      <div className="bg-gray-100 rounded-lg p-6">
        <div className="flex justify-between mb-2">
          <span>0 items</span>
          <span>0.00</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>0.00</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping fee</span>
          <span>0.00</span>
        </div>
        <div className="flex justify-between font-bold mt-4 pt-4 border-t">
          <span>Total</span>
          <span>0.00</span>
        </div>
        <button variant="default" className="w-full mt-4" disabled>
          Check out
        </button>
        <button variant="outline" className="w-full mt-2">
          Continue shopping
        </button>
      </div>
    </div>
  );
}

export default function SummaryPage() {
  return (
    <div className="bg-black-50">
      <div className="container mx-auto h-screen px-4 py-8 ">
        <h1 className="text-2xl font-bold mb-6">My cart</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <ItemContainer />
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
