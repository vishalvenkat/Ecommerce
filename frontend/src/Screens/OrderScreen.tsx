import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetMyOrderByIdQuery,
  useUpdatePaidMutation,
} from "../slices/ordersApiSlice.js";
import Loader from "../Components/Loader.tsx";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";

const OrderScreen = () => {
  const { id } = useParams();
  const { data, refetch, isLoading } = useGetMyOrderByIdQuery(id);
  const order: any = data || {};

  const [payment] = useUpdatePaidMutation();
  const [paymentStatus, setPaymentStatus] = useState(false);

  useEffect(() => {
    if (order) {
      setPaymentStatus(order.isPaid);
    }
  }, [order]);

  const onPaymentClick = () => {
    if (!order) return;
    payment({
      id,
      paymentResult: {
        id,
        status: "paid",
        email_address: order.user.email,
        updateTime: new Date().toISOString(),
      },
    })
      .unwrap()
      .then((data: any) => {
        setPaymentStatus(data.isPaid);
        refetch();
      });
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Shipping Information</h2>
            <p>
              <strong>Name: </strong> {order.user.name}
            </p>
            <p>
              <strong>Email: </strong> {order.user.email}
            </p>
            <p>
              <strong>Shipping Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            <p>
              <strong>Delivery Status: </strong>

              {order.isDelivered ? (
                <span style={{ color: "green" }}>Delivered</span>
              ) : (
                <span style={{ color: "red" }}>Not Delivered</span>
              )}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Payment Status: </strong>
              {order.isPaid ? (
                <span style={{ color: "green" }}>Paid</span>
              ) : (
                <span style={{ color: "red" }}>Not Paid</span>
              )}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Items</h2>
            <ListGroup variant="flush">
              {order.orderItems.map((item: any) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={3}>
                      <Image
                        rounded
                        fluid
                        src={item.image}
                        alt={item.name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      {item.qty} x ${item.price.toFixed(2)} = $
                      {item.qty * item.price.toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card className="mb-3">
          <Card.Header>Order Summary</Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Items:</strong>
                  </Col>
                  <Col>${order.itemsPrice.toFixed(2)}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Shipping:</strong>
                  </Col>
                  <Col>${order.shippingPrice.toFixed(2)}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Tax:</strong>
                  </Col>
                  <Col>${order.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>${order.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={onPaymentClick}
                    disabled={paymentStatus}
                  >
                    {paymentStatus ? "Paid" : "Pay Now"}
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderScreen;
