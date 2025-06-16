import { Col, Row } from "react-bootstrap";
import { Product, ProductType } from "../Components/Product.tsx";
import { FC, useEffect, useState } from "react";
import axios from "axios";

export const HomeScreen: FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);
  return (
    <>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id}>
            <Product
              _id={product._id}
              name={product.name}
              image={product.image}
              price={product.price}
              numReviews={product.numReviews}
              rating={product.rating}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};
