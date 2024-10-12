import { useEffect, useRef, useState } from "react";
import { getCollection } from "../api";

function HomePage() {
  // React Hook
  const isLoaded = useRef(false);
  const [collectionItems, setCollectionItems] = useState([]);

  // Use Effect
  useEffect(() => {
    if (!isLoaded.current) {
      _getCollection();
      isLoaded.current = true;
    }

    return () => {};
  }, []);

  async function _getCollection() {
    setCollectionItems(await getCollection());
  }

  function listCollectionItems() {
    return collectionItems.map((item, index) => (
      <div
        key={`collection-item-${index}`}
        className="aspect-none lg:aspect-square overflow-clip relative lg:col-span-2"
      >
        <img src={item.imageUrl} className="h-full w-full object-cover" />
        <div className="absolute bottom-0 text-center w-full p-4 text-white bg-gradient-to-t from-black/80 to-black/0">
          <p className="mb-4 text-[24px] font-bold">{item.title}</p>
          <p className="mb-4 text-[16px]">{item.description}</p>
          <a
            href="#"
            className="inline-block bg-black p-4 hover:bg-black/75 active:bg-black"
          >
            View more
          </a>
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
        <div className="grid lg:grid-cols-5 sm:grid-cols-3 gap-x-10 gap-y-5 my-24">
          <div className="mb-6 lg:col-span-1">
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
        <div className="my-24 text-center">
          <p className="font-bold text-[32px]">Featured Products</p>

          <div className="mt-16 grid sm:grid-cols-4 gap-y-8 gap-x-8">
            <div className="">1</div>
            <div className="">1</div>
            <div className="">1</div>
            <div className="">1</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
