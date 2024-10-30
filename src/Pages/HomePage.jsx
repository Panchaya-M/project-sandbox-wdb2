import { useEffect, useRef, useState } from "react";
import { getAllProducts, getCollection } from "../api";
import ProductCard from "../Components/UI/ProductCard";
import { Button } from "../Components";

function HomePage() {
  // React Hook
  const isLoaded = useRef(false);
  const [collectionItems, setCollectionItems] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Use Effect
  useEffect(() => {
    if (!isLoaded.current) {
      _getCollection();
      _getFeaturedProducts();
      isLoaded.current = true;
    }

    return () => {};
  }, []);

  async function _getCollection() {
    setCollectionItems(await getCollection());
  }

  async function _getFeaturedProducts() {
    const result = await getAllProducts({ limit: 4 });
    const products = result.data.data;

    setFeaturedProducts(products);
  }

  function listCollectionItems() {
    return collectionItems.map((item, index) => (
      <div
        key={`collection-item-${index}`}
        className="aspect-none 3xl:aspect-square overflow-clip relative col-span-2"
      >
        <img src={item.imageUrl} className="h-full w-full object-cover" />
        <div className="absolute bottom-0 text-center w-full p-4 text-white bg-gradient-to-t from-black/80 to-black/0">
          <p className="mb-4 text-[24px] font-bold">{item.title}</p>
          <p className="mb-4 text-[16px]">{item.description}</p>
          <div className="flex justify-center">
            <Button text="View more" />
          </div>
        </div>
      </div>
    ));
  }

  return (
    <>
      <div className="">
        <img src="/images/banner.jpg" className="w-full" />
      </div>

      {/* Content */}
      <div className="container mx-auto">
        {/* Collections */}
        <div className="grid 3xl:grid-cols-5 md:grid-cols-6 gap-x-10 gap-y-5 my-24">
          <div className="mb-6 3xl:col-span-1 md:col-span-2">
            <div className="">
              <p className="text-[96px] leading-[116px] font-bold">2024</p>
              <p className="text-[48px] leading-[72px] font-bold">Collection</p>
            </div>
            <div>
              <p className="text-base leading-5">
                Step into a world of winter elegance and style with our latest
                Winter Collection. As temperatures drop, our curated selection
                of clothing is designed to keep you fashionably warm. From
                luxurious knitwear to trend-setting outerwear, each piece in our
                collection is a celebration of seasonal sophistication. Explore
                the blend of comfort and fashion, as we present you with the
                must-have ensembles to make a statement in the chilly months
                ahead. Welcome to a winter wardrobe that seamlessly combines
                coziness with chic aesthetics.
              </p>
            </div>
          </div>
          {listCollectionItems()}
        </div>

        {/* Featured Products */}
        <div className="my-24">
          <p className="font-bold text-[32px] text-center">Featured Products</p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-10">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                description={product.description}
                image={product.imageUrls[0]}
                rating={product.ratings}
                price={product.price}
                promotionPrice={product.promotionalPrice}
                isPromotion={product.promotionalPrice < product.price}
                permalink={product.permalink}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
