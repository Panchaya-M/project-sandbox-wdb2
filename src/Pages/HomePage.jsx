import { useEffect, useRef, useState } from "react";
import { getAllProducts, getCollection } from "../api";
import ProductCard from "../Components/UI/ProductCard";

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
    const result = await getAllProducts({ limit: 4 })
    const products = result.data.data;

    setFeaturedProducts(products);
  }

  const mockupProduct = [
    {
      id: "dBt7jOQ9qnKvs8aWrxb5",
      name: "Abstratct Printed Scarf",
      skuCode: "A09004",
      permalink: "accessories-abstratct-printed-scarf",
      description: "Soft fabric, vibrant prints, versatile styling options.",
      price: 1990,
      promotionalPrice: 1990,
      categories: ["all-ladies", "ladies-accessories"],
      collection: "",
      ratings: 4.1,
      imageUrls: [
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2FdBt7jOQ9qnKvs8aWrxb5%2F_images%2FtrWAP3Q0eBJTUjhmP683-Gemini%20Generated%20(8).jpeg?alt=media&token=cf7b47de-a656-4608-98a7-96a6b0cc7a2c",
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2FdBt7jOQ9qnKvs8aWrxb5%2F_images%2FgoquKCU3fvbDahQPM3Zw-Gemini%20Generated%20Image%20(5).jpeg?alt=media&token=04c0b4fb-e504-4eb5-bc58-b8f9378cf038",
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2FdBt7jOQ9qnKvs8aWrxb5%2F_images%2FCDm0y5YKJNIYhEEqqrQ4-Gemini%20Generated%20Image%20(4).jpeg?alt=media&token=ae33d771-6728-410a-8477-076edb15d8eb",
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2FdBt7jOQ9qnKvs8aWrxb5%2F_images%2Fflx7yN8mj5Pc0LumhBzV-Gemini%20(1).jpeg?alt=media&token=c88231a0-346c-46fe-8eb0-52e61f0e15d1",
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2FdBt7jOQ9qnKvs8aWrxb5%2F_images%2FWcplN7199exEqvwtmBjv-Gemini%20Generated%20Image%20(6).jpeg?alt=media&token=6f070a53-587a-4c9e-a212-9319074274c7",
      ],
    },
    {
      id: "6FYslqo6hFuvdIpffL9t",
      name: "Athletic Mesh Slip-On Sneakers",
      skuCode: "S09001",
      permalink: "shoes-athletic-mesh-slip-on-sneakers",
      description:
        "Breathable mesh, elasticized fit, perfect for workouts or casual wear.",
      price: 990,
      promotionalPrice: 990,
      categories: ["all-ladies", "ladies-shoes"],
      collection: "",
      ratings: 3.4,
      imageUrls: [
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2F6FYslqo6hFuvdIpffL9t%2F_images%2F3mbrln243CBzwKICFivJ-Gemini%20Generated%20Image%20(15).jpeg?alt=media&token=bc6c2db4-b5b6-4f4b-994a-a20a5d184565",
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2F6FYslqo6hFuvdIpffL9t%2F_images%2Fqcsy2kpwoi1TgVjYEprr-Gemini%20Generated%20(19).jpeg?alt=media&token=8593f0f9-7e74-4cc0-a9e3-4d88e2178afd",
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2F6FYslqo6hFuvdIpffL9t%2F_images%2FSs193BUsh8qGB3xMIDdn-Gemini%20Generated%20(20).jpeg?alt=media&token=891c9a17-61fc-426b-9bc4-ae4473cd587b",
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2F6FYslqo6hFuvdIpffL9t%2F_images%2FiaIRhc8IROJSXMpPt0xL-Gemini%20Generated%20(1).jpeg?alt=media&token=45aa2ad1-8a8a-4c4d-8006-6ab58b58ac15",
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2F6FYslqo6hFuvdIpffL9t%2F_images%2FyWlHAWr26F68tathEghQ-Gemini%20Generated%20(21).jpeg?alt=media&token=dd6361bf-757c-41a8-be38-cef510347ee2",
      ],
    },
    {
      id: "1zhvksJ5VCf7s90bgypG",
      name: "Backpacks",
      skuCode: "A04005",
      permalink: "men-accessories-backpacks",
      description:
        "A compact and versatile backpack, perfect for everyday use or carrying light essentials. Daypacks typically range from 15 to 25 liters in capacity. ",
      price: 1490,
      promotionalPrice: 1490,
      categories: ["all-men", "men-accessories"],
      collection: "",
      ratings: 1.5,
      imageUrls: [
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2F1zhvksJ5VCf7s90bgypG%2F_images%2FTXqLuweN9DMwWgwrxzUF-Gemini_Generated_Image%20(56).jpeg?alt=media&token=c5edc110-5752-4eda-9305-8a1b75f676b8",
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2F1zhvksJ5VCf7s90bgypG%2F_images%2FLgG3AbAvCeCMfAxaDJM6-Gemini_Generated_Image%20(54).jpeg?alt=media&token=7ef08268-032b-4971-9545-dc31fa3d48eb",
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2F1zhvksJ5VCf7s90bgypG%2F_images%2FFTIh8V64wMczYideLd7L-Gemini_Generated_Image%20(55).jpeg?alt=media&token=fcc924bd-d51c-4121-a0a4-0bc2bec28906",
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2F1zhvksJ5VCf7s90bgypG%2F_images%2FwJDBw7EjrPSl6FSgC34Q-Gemini_Generated_Image%20(57).jpeg?alt=media&token=5eb99635-5056-49b9-b0f4-b1c77efd4d5e",
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2F1zhvksJ5VCf7s90bgypG%2F_images%2FErLe4UIlq6jWPjosdmU8-Gemini_Generated_Image%20(53).jpeg?alt=media&token=d14a06e7-7693-4464-a069-4bb6fcf0532e",
      ],
    },
    {
      id: "qK3cDSs3ndfVfqfnflOO",
      name: "Chelsea Boots",
      skuCode: "C02005",
      permalink: "shoes-chelsea-boots",
      description:
        "An elegant and practical boot style with elasticated side panels for easy on and off.  Suitable for colder weather and can be dressed up or down. ",
      price: 6900,
      promotionalPrice: 3450,
      categories: ["all-men", "men-shoes"],
      collection: "price-down",
      ratings: 3.8,
      imageUrls: [
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2FqK3cDSs3ndfVfqfnflOO%2F_images%2FpbSN3PWcvDqDx8yTyWzu-Gemini_Generated_Image%20(3).jpeg?alt=media&token=a71aa635-e846-4432-bbcd-a429ad23d2dd",
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2FqK3cDSs3ndfVfqfnflOO%2F_images%2FLXd765wQxUzNoPN7aVOU-Gemini_Generated_Image%20(20).jpeg?alt=media&token=0d16dd67-a407-463c-acec-e6ea691f1980",
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2FqK3cDSs3ndfVfqfnflOO%2F_images%2FVmISVmwYX35Iti6oFTyc-Gemini_Generated_Image%20(18).jpeg?alt=media&token=9e5ed0d6-8ed4-4742-8d9d-606809c0a09d",
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2FqK3cDSs3ndfVfqfnflOO%2F_images%2FrjxafTdCJpPXTC98cotD-Gemini_Generated_Image%20(19).jpeg?alt=media&token=d7a7fd15-6dc3-4b5d-a85f-0f9d9398a3f8",
        "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2FqK3cDSs3ndfVfqfnflOO%2F_images%2F9ZpycISHflUpXtotm6wr-Gemini_Generated_Image%20(21).jpeg?alt=media&token=41ab6149-45d7-409d-af3c-3d9a3b60682e",
      ],
    },
  ];

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
        <div className="my-24">
          <p className="font-bold text-[32px] text-center">Featured Products</p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-10">
            {featuredProducts.map(product => (
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
