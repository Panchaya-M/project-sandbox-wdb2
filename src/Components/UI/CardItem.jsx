import CardEmpty from "../../assets/empty_cart.png";

function ItemContainer() {
  return (
    <div className="flex justify-center items-center h-screen text-center">
      <div className="max-w-sm">
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

function CardItem({ type = "card-item", text, icon, className, onClick }) {
  return <ItemContainer></ItemContainer>;
}

export default CardItem;
