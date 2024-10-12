import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Layouts } from "./Components";

function App() {
  // React Hook
  const isLoaded = useRef(false);
  const [collectionItems, setCollectionItems] = useState([]);

  // Use Effect
  useEffect(() => {
    if (!isLoaded.current) {
      getCollection();
      isLoaded.current = true;
    }

    return () => {};
  }, []);

  async function getCollection() {
    const result = await axios.get(
      "https://api.storefront.wdb.skooldio.dev/collections"
    );

    if (
      Array.isArray(result.data) &&
      result.data.length > 0 &&
      result.data[0].items &&
      result.data[0].items.length > 0
    ) {
      setCollectionItems(result.data[result.data.length - 1].items.reverse());
    }
  }

  function listCollectionItems() {
    return collectionItems.map((item, index) => (
      <div
        key={`collection-item-${index}`}
        className="aspect-square overflow-clip relative"
      >
        <img src={item.imageUrl} className="h-full w-full object-cover" />
        <div className="absolute bottom-0 text-center w-full p-4 text-white bg-gradient-to-t from-black/80 to-black/0">
          <p className="mb-4 text-[24px] font-bold">{item.title}</p>
          <p className="mb-4 text-[16px]">{item.description}</p>
          <button className="bg-black p-4">View more</button>
        </div>
      </div>
    ));
  }

  return (
    <Layouts>
      <div className="">
        <img src="/images/banner.jpg" className="w-full" />
      </div>

      {/* Collections */}
      <div className="grid grid-cols-3 gap-x-10 my-24">
        <div className="mb-6">
          <div className="">
            <p className="text-[96px] leading-[116px] font-bold">2024</p>
            <p className="text-[48px] leading-[72px] font-bold">Collection</p>
          </div>
          <div>
            <p className="text-base leading-5">
              Step into a world of winter elegance and style with our latest
              Winter Collection. As temperatures drop, our curated selection of
              clothing is designed to keep you fashionably warm. From luxurious
              knitwear to trend-setting outerwear, each piece in our collection
              is a celebration of seasonal sophistication. Explore the blend of
              comfort and fashion, as we present you with the must-have
              ensembles to make a statement in the chilly months ahead. Welcome
              to a winter wardrobe that seamlessly combines coziness with chic
              aesthetics.
            </p>
          </div>
        </div>
        {listCollectionItems()}
      </div>

      {/* Featured Products */}
      <div className="my-24 text-center">
        <p className="font-bold text-[32px]">Featured Products</p>

        <div className="mt-16 grid grid-cols-4">
          <div className="">1</div>
          <div className="">1</div>
          <div className="">1</div>
          <div className="">1</div>
        </div>
      </div>
    </Layouts>
  );
}

export default App;
