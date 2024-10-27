import React from "react";
import PropTypes from "prop-types";
import Button, { ButtonCustom } from "../UI/Button.jsx";
import Bill from "../../assets/bill.svg";
import CreditCard from "../../assets/credit-card.svg";

const CartSummary = ({ items }) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.defaultQuantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.defaultQuantity, 0);

  return (
    // <div className="xxl:w-[616px] xxl:h-[464px] xl:w-[440px] xl:h-[464px] bg-white w-full md:w-1/3">
    <div className="xxl:w-[616px] xl:w-[440px]  bg-white w-full md:w-1/3">
      <div className="flex flex-col mx-6 my-6 space-y-10">
        {/* detail */}
        <div className="flex flex-col justify-between gap-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-h6Bold">Summary</span>
            <span className="text-subHeading text-gray-500 flex items-center gap-1">
              <img src={Bill} className="h-5 w-5" />
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>
          <div className="flex flex-col space-y-6">
            {items ? (
              items.map((item) => (
                <div key={item.id} className="flex justify-between ">
                  <span>
                    {item.name} x {item.defaultQuantity}
                  </span>
                  <span>{item.price.toLocaleString()}</span>
                </div>
              ))
            ) : (
              <div className="flex justify-between">
                <span className="text-bodyText text-black">No item</span>
                <span className="text-bodyText  text-black-700">0.00</span>
              </div>
            )}

            <div className="flex flex-col justify-center border-t border-t-black-300 border-b border-b-black-300 h-[104px]">
              <div className="flex flex-col h-[56px] justify-between">
                <div className="flex justify-between ">
                  <span className="text-bodyText text-black">Subtotal</span>
                  <span className="text-bodyText  text-black-700">
                    {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bodyText text-black">Shipping fee</span>
                  <span className="text-bodyText  text-black-700">Free</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-subHeading text-black">Total</span>
              <span className="text-subHeading  text-black">
                {subtotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        {/* button */}
        <div className="flex flex-col h-[124px] justify-between">
          <Button
            text="Check out"
            customClassName="transition-colors duration-200"
          ></Button>
          <ButtonCustom
            text="Continue shopping"
            customClassName="transition-colors duration-200"
          ></ButtonCustom>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-wrap gap-2 justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/64/349/349221.png"
              alt="Visa"
              className="h-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/64/349/349228.png"
              alt="MasterCard"
              className="h-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/64/349/349230.png"
              alt="American Express"
              className="h-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/64/349/349216.png"
              alt="PayPal"
              className="h-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export function CartSummaryEmpty() {
  return (
    <div className="xxl:w-[616px] xl:w-[440px] h-full bg-white w-full md:w-1/3">
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
              <span className="text-subHeading text-black-500">Total</span>
              <span className="text-subHeading  text-black-500">0.00</span>
            </div>
          </div>
        </div>
        {/* button */}
        <div className="flex flex-col h-[124px] justify-between">
          <Button
            text="Check out"
            customClassName="transition-colors duration-200"
          ></Button>
          <ButtonCustom
            text="Continue shopping"
            customClassName="transition-colors duration-200"
          ></ButtonCustom>
        </div>
      </div>
    </div>
  );
}

CartSummary.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      defaultQuantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CartSummary;
