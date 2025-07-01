import React from "react";
import { useGetAllOrdersQuery } from "../../slices/ordersApiSlice";
import AlertMessage from "../../Components/AlertMessage.tsx";
import Loader from "../../Components/Loader.tsx";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderListScreen = () => {
  const { data, isLoading, error } = useGetAllOrdersQuery(undefined);
  const orders: any = data || [];
  if (error) {
    return (
      <AlertMessage variant="danger">
        Error occured while fetching orders
      </AlertMessage>
    );
  }

  if (isLoading) return <Loader />;

  const ordersTable = (
    <Table striped hover responsive className="table-sm">
      <thead>
        <tr>
          <th>User name</th>
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
            <td>{order.user.name}</td>
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
    <>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <AlertMessage variant="info">No orders found</AlertMessage>
      ) : (
        ordersTable
      )}
    </>
  );
};

export default OrderListScreen;
