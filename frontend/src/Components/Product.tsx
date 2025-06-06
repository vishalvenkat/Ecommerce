import { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating.tsx";

type ProductType = {
  id: number;
  name: string;
  image: string;
  price: number;
  star: number;
  numReviews: number;
};

export const Product: FC<ProductType> = ({
  id,
  name,
  image,
  price,
  star,
  numReviews,
}) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${id}`}>
        <Card.Img src={image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${id}`}>
          <Card.Title className="product-title">
            <strong>{name}</strong>
          </Card.Title>
        </Link>

        <Card.Text>
          <Rating star={star} numReviews={numReviews} />
        </Card.Text>

        <Card.Text>${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
