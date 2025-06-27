import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import AlertMessage from "../Components/AlertMessage.tsx";
import { useAddToCartMutation } from "../slices/ordersApiSlice";
import { clearCart } from "../slices/cartSlice.js";

const PlaceOrderScreen = () => {
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = useSelector((state: any) => state.cart);

  const navigate = useNavigate();

  useEffect(() => {
    if (!paymentMethod) {
      // Redirect to payment screen if payment method is not set
      navigate("/payment");
    }
    if (!shippingAddress.address) {
      // Redirect to shipping screen if shipping address is not set
      navigate("/shipping");
    }
  }, [shippingAddress, paymentMethod, navigate]);

  const [createOrder] = useAddToCartMutation();
  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res: any = await createOrder({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      }).unwrap();
      dispatch(clearCart());
      navigate("/order/" + res._id);
    } catch (err) {
      <AlertMessage variant="danger">{err?.error}</AlertMessage>;
    }
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Place Order</h1>
        <ListGroup>
          <ListGroup.Item>
            <strong>Shipping Address</strong>
            <p>
              {shippingAddress.address}, {shippingAddress.city}{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Payment Method</strong>
            <p>{paymentMethod}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Order Items</strong>
            {orderItems?.length === 0 ? (
              <AlertMessage variant="info">Your cart is empty</AlertMessage>
            ) : (
              <ListGroup variant="flush">
                {orderItems.map((item: any) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={3}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded"
                        />
                      </Col>
                      <Col md={3}>
                        <Link to={`/products/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        {item.qty} * ${item.price}
                      </Col>
                      <Col md={3}>${item.price * item.qty}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <h2>Order Summary</h2>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Items cost</strong>
                </Col>
                <Col> ${itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Shipping cost</strong>
                </Col>
                <Col>${shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>VAT</strong>
                </Col>
                <Col>${taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Total cost</strong>
                </Col>
                <Col>${totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={orderItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default PlaceOrderScreen;
