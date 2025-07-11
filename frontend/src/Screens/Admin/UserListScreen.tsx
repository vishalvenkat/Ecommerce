import React from "react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../slices/userApiSlice";
import Loader from "../../Components/Loader.tsx";
import AlertMessage from "../../Components/AlertMessage.tsx";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";

const UserListScreen = () => {
  const { data, isLoading, error, refetch } = useGetAllUsersQuery(undefined);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const users: any = data || [];

  if (isLoading || isDeleting) {
    return <Loader />;
  }

  if (error) {
    return (
      <AlertMessage variant="danger">
        An error occurred while fetching users.
      </AlertMessage>
    );
  }
  if (!users || users.length === 0) {
    return (
      <AlertMessage variant="info">
        No users found. Please create a user.
      </AlertMessage>
    );
  }

  const editUserButton = (userId: number) => (
    <Link to={`/admin/user/${userId}/edit`}>
      <Button variant="light" className="btn-sm">
        <FaEdit />
      </Button>
    </Link>
  );

  const deleteUserHandler = async (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
      refetch(); // Refetch the users after deletion
    }
  };

  const deleteUserButton = (userId: number) => (
    <Button
      variant="danger"
      className="btn-sm"
      onClick={() => deleteUserHandler(userId)}
    >
      <FaTrash />
    </Button>
  );

  const usersTable = (
    <Table striped hover responsive className="table-sm">
      <thead>
        <tr>
          <th>Id</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>IS ADMIN</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: any) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              {user.isAdmin ? (
                <FaCheck style={{ color: "green" }} />
              ) : (
                <FaTimes style={{ color: "red" }} />
              )}
            </td>
            <td>
              {editUserButton(user._id)}
              {deleteUserButton(user._id)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div>
      <h1>User List</h1>
      {usersTable}
    </div>
  );
};

export default UserListScreen;
