/* eslint-disable react/prop-types */
import Star from "../../assets/star.svg";
import StarGreen from "../../assets/star-green.svg";

const fullRating = 5;

function Ratings({rating}) {
  return <div className="flex gap-2.5 mb-2">
    {[...Array(fullRating)].map((_, index) => {
      if (index + 1 <= rating) {
        return <img key={index} src={StarGreen} alt="star-green" />;
      }
      return <img key={index} src={Star} alt="star" />;
    })}
  </div>
}

export default Ratings;