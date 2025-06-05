import { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

type ProductType = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export const Product: FC<ProductType> = ({ id, name, image, price }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${id}`}>
        <Card.Img src={image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${id}`}>
          <Card.Title>
            <strong>{name}</strong>
          </Card.Title>
        </Link>

        <Card.Text>${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
