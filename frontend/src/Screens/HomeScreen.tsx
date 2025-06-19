import { Col, Row } from "react-bootstrap";
import { Product, ProductType } from "../Components/Product.tsx";
import { FC } from "react";
import { useGetProductsQuery } from "../slices/productApiSlice.js";

export const HomeScreen: FC = () => {
  const { data, isLoading, isError } = useGetProductsQuery(undefined);
  const products = data as ProductType[];

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <div>Error loading products</div>;

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
