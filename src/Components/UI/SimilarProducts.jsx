import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../api";

function SimilarProducts({category}) {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    _getRelatedProducts();
  }, []);

  async function _getRelatedProducts() {
    const params = {
      limit: 4,
      categories: category || "",
    }
    const result = await getAllProducts(params);
    console.log('result :>> ', result);

    setRelatedProducts(result);
  }

  return (
    <div className="container mx-auto mb-24">
      <p className="font-bold text-[32px]">People also like these</p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {relatedProducts.map(product => (
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

export default SimilarProducts;
