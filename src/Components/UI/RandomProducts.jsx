import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../api";
import useAlert from "../../hooks/useAlert";
import Loading from "./Loading";

function RandomProducts({
  header = "",
  headerAlign = "center",
  limit = 4,
  excludeId,
  category,
}) {
  const alert = useAlert();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    _getRelatedProducts();
  }, []);

  const getRandomProducts = (products) => {
    const shuffledArray = products.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, limit);
  };

  async function _getRelatedProducts() {
    try {
      const params = {
        categories: category || "",
      };
      const result = await getAllProducts(params);

      if (excludeId) {
        const filteredProducts = result.data.data.filter(
          (product) => product.id !== excludeId
        );
        const randomProducts = getRandomProducts(filteredProducts);
        setRelatedProducts(randomProducts);
      } else {
        const randomProducts = getRandomProducts(result.data.data);
        setRelatedProducts(randomProducts);
      }
    } catch (error) {
      alert.error(error.response.data.message);
    }
  }

  if (!relatedProducts.length) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto mb-24">
      <p className={`font-bold text-[32px] text-${headerAlign}`}>{header}</p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {relatedProducts.length > 0 &&
          relatedProducts.map((product) => (
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
  );
}

export default RandomProducts;
