import { Col, Row } from "react-bootstrap";
import { products } from "../products";
import { Product } from "../Components/Product.tsx";
import { FC } from "react";

export const HomeScreen: FC = () => {
  return (
    <>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.id}>
            <Product
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              numReviews={product.numReviews}
              star={product.rating}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};
