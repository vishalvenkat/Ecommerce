import React, { FC, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import Rating from "../Components/Rating.tsx";

import { useGetProductsByIdQuery } from "../slices/productApiSlice.js";
import { useCreateReviewsMutation } from "../slices/reviewApiSlice.js";
import { ProductType } from "../Components/Product.tsx";
import Loader from "../Components/Loader.tsx";
import AlertMessage from "../Components/AlertMessage.tsx";
import { addToCart } from "../slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import GoBackButton from "../Components/GoBackButton.tsx";

export const ProductScreen: FC = () => {
  const { id } = useParams();
  const [qty, setQty] = useState<number>(1);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useGetProductsByIdQuery(id);
  const [createReview, { isLoading: isReviewLoading }] =
    useCreateReviewsMutation();

  const anyData: any = data;
  const currentProduct: ProductType | undefined = anyData?.product;
  const currentProductReview = anyData?.reviews;

  const { userInfo } = useSelector((state: any) => state.auth);

  const myReview = currentProductReview?.find(
    (review: any) => review.user._id === userInfo?.id
  );

  if (isLoading) return <Loader />;
  if (isError || !currentProduct)
    return (
      <AlertMessage variant={"danger"}>Error Loading Product</AlertMessage>
    );

  const addToCartHandler = () => {
    dispatch(addToCart({ ...currentProduct, qty }));
    navigate(`/cart`);
  };

  const onReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") {
      return alert("Please fill in all fields");
    }
    await createReview({ product: id, rating, comment }).unwrap();
    refetch();
  };

  return (
    <>
      <GoBackButton linkTo="/" />

      <Row className="my-3">
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
      <Row className="my-3">
        <h2>Reviews {`(${currentProductReview?.length})`}</h2>
        <Col md={6}>
          {myReview ? (
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Your Review</h4>
                <Rating rating={myReview.rating} />
                <p>{myReview.comment}</p>
              </ListGroup.Item>
            </ListGroup>
          ) : (
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Write a Review</h4>
                {userInfo ? (
                  <Form onSubmit={onReviewSubmit}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        required
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                      >
                        <option value="0">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Button
                      className="btn-primary"
                      type="submit"
                      disabled={isReviewLoading}
                    >
                      Submit Review
                    </Button>
                  </Form>
                ) : (
                  <AlertMessage variant="info">
                    Please <Link to="/login">Login</Link> to write a review.
                  </AlertMessage>
                )}
              </ListGroup.Item>
            </ListGroup>
          )}
        </Col>
        <Col md={6}>
          {currentProductReview?.filter(
            (review: any) => review.user?.id !== userInfo?.id
          ).length === 0 ? (
            <AlertMessage variant="info">No Review Yet</AlertMessage>
          ) : (
            <Card>
              <Card.Header>Reviews</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {currentProductReview
                    .filter((review: any) => review.user?._id !== userInfo?.id)
                    .map((review) => (
                      <ListGroup.Item key={review._id}>
                        <Row>
                          <Col xs={8}>
                            <strong>{review.user.name}</strong>
                          </Col>
                          <Col xs={4}>
                            <Rating rating={review.rating} />
                          </Col>
                        </Row>

                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};
