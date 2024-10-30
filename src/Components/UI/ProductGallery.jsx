import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductGallery = ({
  imageUrls,
  isOutOfStock,
  price,
  promotionPrice,
  isPromotion,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const percentDiscount = Math.round(((price - promotionPrice) / price) * 100);

  return (
    <div className="w-full max-w-[576px] 3xl:max-w-[764px] mx-auto">
      {/* Main Slider */}
      <div className="relative mb-4 w-full max-h-[764px] overflow-hidden">
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {imageUrls.map((url, index) => (
            <SwiperSlide key={url}>
              <div className="w-full relative bg-gray-50 flex justify-center items-center">
                <img
                  src={url}
                  alt={`Product view ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  className={isOutOfStock ? "brightness-50" : ""}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {isOutOfStock ? (
          <div className="absolute top-6 right-0 out-of-stock z-[99]">
            Out of stock
          </div>
        ) : (
          isPromotion && (
            <div className="absolute top-6 right-0 percent-discount z-[99]">
              - {percentDiscount}%
            </div>
          )
        )}
      </div>

      {/* Thumbnail Slider */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbs-swiper"
      >
        {imageUrls.map((url, index) => (
          <SwiperSlide key={url}>
            <button className="relative aspect-[1/1] w-full overflow-hidden rounded focus:outline-none">
              <img
                src={url}
                alt={`Thumbnail ${index + 1}`}
                className={`w-full h-full object-cover cursor-pointer ${isOutOfStock ? "brightness-50" : ""}`}
                loading="lazy"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductGallery;
