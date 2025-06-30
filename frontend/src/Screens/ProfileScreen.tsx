import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserProfileMutation } from "../slices/userApiSlice";
import Loader from "../Components/Loader.tsx";
import CustomFormGroup from "../Components/CustomFormGroup.tsx";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice.js";
import { Link } from "react-router-dom";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (userInfo.name && userInfo.email) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email]);

  const dispatch = useDispatch();

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const res = await updateUserProfile({
      id: userInfo._id,
      name,
      email,
      password: password || undefined, // Only send password if it's not empty
    }).unwrap();

    console.log("Profile updated:", res);

    dispatch(setCredentials(res));
  };

  const { data, isLoading: loadingOrders } = useGetMyOrdersQuery(undefined);
  const orders: any = data || [];

  if (isLoading) {
    return <Loader />;
  }

  const ordersTable = (
    <Table striped hover responsive className="table-sm">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Order Date</th>
          <th>Payment Method</th>
          <th>Total Price</th>
          <th>Payment Status</th>
          <th>Delivery Status</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order: any) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            <td>{order.paymentMethod}</td>
            <td>${order.totalPrice}</td>
            <td>
              {order.isPaid ? (
                <span style={{ color: "green" }}>Paid</span>
              ) : (
                <span style={{ color: "red" }}>Pending</span>
              )}
            </td>
            <td>
              {order.isDelivered ? (
                <span style={{ color: "green" }}>Delivered</span>
              ) : (
                <span style={{ color: "red" }}>Not Delivered</span>
              )}
            </td>
            <td>
              <Link to={`/order/${order._id}`}>
                <Button variant="primary" className="btn-sm">
                  Details
                </Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
  return (
    <Row>
      <Col md={5}>
        <Card className="my-3 p-3 rounded">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <h2>Update Profile</h2>
              <CustomFormGroup
                name="name"
                label="Name"
                placeholder="Enter name"
                value={name}
                onChangeHandler={(e) => setName(e.target.value)}
              />
              <CustomFormGroup
                name="email"
                label="Email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChangeHandler={(e) => setEmail(e.target.value)}
              />
              <CustomFormGroup
                name="password"
                label="Password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChangeHandler={(e) => setPassword(e.target.value)}
              />
              <CustomFormGroup
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Enter password"
                value={confirmPassword}
                onChangeHandler={(e) => setConfirmPassword(e.target.value)}
              />
              <Button type="submit" variant="primary" className="btn-block">
                Update Profile
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={7}>
        <h2>My Orders</h2>
        {loadingOrders ? <Loader /> : ordersTable}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
