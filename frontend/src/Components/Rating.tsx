import React, { FC, JSX } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
type RatingProps = {
  rating: number;
  numReviews: number;
};
const Rating: FC<RatingProps> = ({ rating, numReviews }) => {
  const renderStars = () => {
    const stars: JSX.Element[] = [];
    while (rating >= 1) {
      stars.push(<FaStar key={stars.length} />);
      rating--;
    }
    if (rating === 0.5) stars.push(<FaStarHalfAlt key={stars.length} />);

    while (stars.length < 5) {
      stars.push(<FaRegStar key={stars.length} />);
    }

    return stars;
  };
  return (
    <span className="rating">
      {renderStars()}
      <span className="rating-text">{numReviews && `(${numReviews})`}</span>
    </span>
  );
};

export default Rating;
