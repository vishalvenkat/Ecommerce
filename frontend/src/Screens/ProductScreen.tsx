import React, { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Rating from "../Components/Rating.tsx";

import { useGetProductsByIdQuery } from "../slices/productApiSlice.js";
import { ProductType } from "../Components/Product.tsx";
import Loader from "../Components/Loader.tsx";
import AlertMessage from "../Components/AlertMessage.tsx";

export const ProductScreen: FC = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetProductsByIdQuery(id);

  const currentProduct = data as ProductType;

  if (isLoading) return <Loader />;
  if (isError || !currentProduct)
    <AlertMessage variant={"danger"}>Error Loading Product</AlertMessage>;
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go back
      </Link>

      <Row>
        {/* Image banner column */}
        <Col md={5}>
          <Image src={currentProduct?.image} alt={currentProduct?.name} fluid />
        </Col>

        {/* Name, Ratings, Price and Product description */}
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{currentProduct?.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={currentProduct?.rating ?? 0}
                numReviews={currentProduct?.numReviews ?? 0}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${currentProduct?.price ?? 0.0}
            </ListGroup.Item>
            <ListGroup.Item>
              {currentProduct?.description ?? currentProduct?.name}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Price, Product In stock, Add to cart */}
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>
                    <strong>${currentProduct?.price ?? 0}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col>
                    <strong>
                      {currentProduct?.countInStock
                        ? "In Stock"
                        : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <button
                  className="btn btn-primary"
                  type="button"
                  disabled={currentProduct?.countInStock === 0}
                >
                  Add to cart
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
