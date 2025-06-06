import React, { FC, JSX } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
type RatingProps = {
  star: number;
  numReviews: number;
};
const Rating: FC<RatingProps> = ({ star, numReviews }) => {
  const renderStars = () => {
    const stars: JSX.Element[] = [];
    while (star >= 1) {
      stars.push(<FaStar />);
      star--;
    }
    if (star === 0.5) stars.push(<FaStarHalfAlt />);

    while (stars.length < 5) {
      stars.push(<FaRegStar />);
    }

    return stars;
  };
  return (
    <div className="rating">
      {renderStars()}
      <span className="rating-text">{numReviews && `(${numReviews})`}</span>
    </div>
  );
};

export default Rating;
