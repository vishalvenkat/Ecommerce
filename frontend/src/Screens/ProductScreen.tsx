import React, { FC, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import Rating from "../Components/Rating.tsx";

import { useGetProductsByIdQuery } from "../slices/productApiSlice.js";
import { ProductType } from "../Components/Product.tsx";
import Loader from "../Components/Loader.tsx";
import AlertMessage from "../Components/AlertMessage.tsx";
import { addToCart } from "../slices/cartSlice.js";
import { useDispatch } from "react-redux";

export const ProductScreen: FC = () => {
  const { id } = useParams();
  const [qty, setQty] = useState<number>(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetProductsByIdQuery(id);

  const currentProduct = data as ProductType;

  if (isLoading) return <Loader />;
  if (isError || !currentProduct)
    <AlertMessage variant={"danger"}>Error Loading Product</AlertMessage>;

  const addToCartHandler = () => {
    dispatch(addToCart({ ...currentProduct, qty }));
    navigate(`/cart`);
  };

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
              {currentProduct?.countInStock ? (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(currentProduct.countInStock).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ) : null}
              <ListGroup.Item>
                <button
                  className="btn btn-primary"
                  type="button"
                  disabled={currentProduct?.countInStock === 0}
                  onClick={addToCartHandler}
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
