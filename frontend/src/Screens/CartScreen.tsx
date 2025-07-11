import React from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../Components/AlertMessage.tsx";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { getNoOfItemsInCart } from "../utils/cartUtils.js";
import { addToCart, removeFromCart } from "../slices/cartSlice.js";
import Meta from "../Components/Meta.tsx";

const CartScreen = () => {
  const { orderItems, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCartHandler = (item: any, qty: number) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const removeFromCartHandler = (item: any) => {
    dispatch(removeFromCart(item._id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <>
      <Meta title="Shopping Cart" description="Your shopping cart" />
      <Row>
        <Col md={8}>
          <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
          {orderItems.length === 0 ? (
            <AlertMessage variant={"success"}>
              Your cart is empty <Link to="/">Go Back</Link>
            </AlertMessage>
          ) : (
            <ListGroup variant="flush">
              {orderItems.map((item: any) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>
              <h3>Order Summary</h3>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Total Items</Col>
                  <Col>
                    <strong>{getNoOfItemsInCart(orderItems)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {orderItems.length !== 0 && (
                <>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items Price:</Col>
                      <Col>${itemsPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Shipping Price:</Col>
                      <Col>${shippingPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Tax Price:</Col>
                      <Col>${taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total Price:</Col>
                      <Col>
                        <strong>${totalPrice}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </>
              )}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={orderItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
