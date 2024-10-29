import { Skeleton } from "@mui/material";

const CartSkeleton = () => {
  return (
    <div className="bg-black-50 pb-24">
      <div className="container mx-auto min-h-screen">
        {/* Header Skeleton */}
        <div className="py-[41px] px-6">
          <Skeleton variant="text" width={120} height={32} />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 divide-y px-6">
              {/* Render multiple cart item skeletons */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="py-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Skeleton variant="rectangular" width={120} height={120} />

                    <div className="flex-grow">
                      {/* Product Title */}
                      <Skeleton variant="text" width="60%" height={24} />

                      {/* Price */}
                      <Skeleton variant="text" width={80} height={24} />

                      {/* Color and Size Selectors */}
                      <div className="flex gap-4 mt-2">
                        <Skeleton
                          variant="rectangular"
                          width={100}
                          height={40}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={100}
                          height={40}
                        />
                      </div>

                      {/* Quantity Selector */}
                      <Skeleton
                        variant="rectangular"
                        width={120}
                        height={40}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary Section */}
          <div className="w-full md:w-[400px]">
            <div className="bg-white p-6 rounded-lg">
              <Skeleton variant="text" width="40%" height={32} />

              {/* Summary Items */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between my-4">
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="20%" />
                </div>
              ))}

              {/* Total */}
              <div className="mt-6 pt-4">
                <div className="flex justify-between">
                  <Skeleton variant="text" width="30%" height={28} />
                  <Skeleton variant="text" width="20%" height={28} />
                </div>
              </div>

              {/* Checkout Button */}
              <Skeleton
                variant="rectangular"
                width="100%"
                height={48}
                className="mt-4"
              />
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="my-24">
          <Skeleton variant="text" width={200} height={32} className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton
                  variant="text"
                  width="70%"
                  height={24}
                  className="mt-2"
                />
                <Skeleton variant="text" width="40%" height={24} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
