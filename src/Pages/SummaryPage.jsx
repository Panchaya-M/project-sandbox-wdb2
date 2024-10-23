// import { Button } from "@/components/ui/button";
import CardEmpty from "../assets/images/empty_cart.png";
import Button, { ButtonCustom } from "../Components/UI/Button.jsx";

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
    <div className="flex flex-col xl:w-[944px] xl:h-[838px] md:w-2/3  bg-white">
      {/* item text */}
      <p className="text-h6Bold mt-6 ml-6 mb-6 w-fit">Items</p>
      {/* item cart empty part */}
      <div className="flex flex-col justify-center items-center text-center space-y-6">
        <div>
          <img
            src={CardEmpty}
            alt="Empty Cart"
            className="mx-auto w-[403px] h-[403px]"
          />
        </div>
        <div className="flex flex-col justify-center space-y-2">
          <h1 className="text-h4Bold ">Your cart is empty</h1>
          <p className="text-subHeading ">
            Looks like you have not added anything to your cart.
            <br />
            Go ahead & explore top categories.
          </p>
        </div>
        <div>
          <Button text="Continue shopping"></Button>
          {/* <button
            type="button"
            className={`btn btn-primary  ${fasle ? "btn-primary-active" : ""}`}
            // onClick={onClick}
            // style={customStyle}
            // disabled={disabled}
          >
            Continue shopping
          </button> */}
        </div>
      </div>
    </div>
  );
}

function CartSummary() {
  return (
    <div className="xl:w-[616px] xl:h-[464px] bg-white w-full md:w-1/3">
      <div className="flex flex-col mx-6 my-6 space-y-10">
        {/* detail */}
        <div className="flex flex-col justify-between gap-6">
          <div className="flex justify-between h-[44px]">
            <span className="text-h6Bold">Summary</span>
            <span className="text-subHeading  text-black-700">0 items</span>
          </div>
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between">
              <span className="text-bodyText text-black-500">No item</span>
              <span className="text-bodyText  text-black-500">0.00</span>
            </div>
            <div className="flex flex-col justify-center border-t border-t-black-300 border-b border-b-black-300 h-[104px]">
              <div className="flex flex-col h-[56px] justify-between">
                <div className="flex justify-between ">
                  <span className="text-bodyText text-black-500">Subtotal</span>
                  <span className="text-bodyText  text-black-500">0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bodyText text-black-500">
                    Shipping fee
                  </span>
                  <span className="text-bodyText  text-black-500">0.00</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-bodyText text-black-500">Total</span>
              <span className="text-bodyText  text-black-500">0.00</span>
            </div>
          </div>
        </div>
        {/* button */}
        <div className="flex flex-col h-[124px] justify-between">
          <Button text="Check out"></Button>
          <ButtonCustom text="Continue shopping"></ButtonCustom>
        </div>
      </div>

      {/* <h2 className="text-xl font-semibold mb-4">Summary</h2>
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
      </div> */}
    </div>
  );
}

export default function SummaryPage() {
  return (
    <>
      <div className="bg-black-50 pb-24">
        {/* Add padding-bottom here */}
        <div className="container mx-auto min-h-screen">
          {/* Ensure the content takes at least full height */}
          <h1 className="text-h5Bold py-[41px] ml-6">My cart</h1>
          <div className="flex flex-col md:flex-row gap-8">
            <ItemContainer />
            <CartSummary />
          </div>
        </div>
      </div>
    </>
  );
}
