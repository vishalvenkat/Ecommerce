import { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating.tsx";

export type ProductType = {
  _id: number;
  name: string;
  image: string;
  description?: string;
  price: number;
  rating: number;
  numReviews: number;
  countInStock?: number;
};

export const Product: FC<ProductType> = ({
  _id,
  name,
  image,
  price,
  rating,
  numReviews,
}) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/products/${_id}`}>
        <Card.Img src={image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/products/${_id}`}>
          <Card.Title className="product-title">
            <strong>{name}</strong>
          </Card.Title>
        </Link>

        <Card.Text>
          <Rating rating={rating} numReviews={numReviews} />
        </Card.Text>

        <Card.Text>${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
