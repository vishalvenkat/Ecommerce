import { Col, Row } from "react-bootstrap";
import { Product, ProductType } from "../Components/Product.tsx";
import { FC } from "react";
import { useGetProductsQuery } from "../slices/productApiSlice.js";
import Loader from "../Components/Loader.tsx";
import AlertMessage from "../Components/AlertMessage.tsx";
import Meta from "../Components/Meta.tsx";

export const HomeScreen: FC = () => {
  const { data, isLoading, isError } = useGetProductsQuery(undefined);
  const products = data as ProductType[];

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <AlertMessage variant={"danger"}>Error Loading Products</AlertMessage>
    );

  return (
    <>
      <Meta title="Latest Products" description="Browse our latest products" />
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
