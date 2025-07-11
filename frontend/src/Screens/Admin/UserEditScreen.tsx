import React, { use, useEffect, useState } from "react";
import GoBackButton from "../../Components/GoBackButton.tsx";
import FormContainer from "../../Components/FormContainer.tsx";
import { Button, Form } from "react-bootstrap";
import CustomFormGroup from "../../Components/CustomFormGroup.tsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
} from "../../slices/userApiSlice";

const UserEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading: isUserLoading, refetch } = useGetUserByIdQuery(id);
  const [updateUserById, { isLoading: isUpdating }] =
    useUpdateUserByIdMutation();
  const user: any = data;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    console.log(name, value, type);
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : type === "checkbox"
          ? e.target.checked
          : value,
    }));
  };
  const updateUserHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserById({ id, ...formData }).unwrap();
      refetch(); // Refetch the user data after updating
      navigate("/admin/userlist");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <>
      <GoBackButton linkTo="/admin/userlist" />
      <FormContainer>
        <Form onSubmit={updateUserHandler}>
          <CustomFormGroup
            name="name"
            label="Name"
            type="text"
            value={formData.name}
            placeholder="Enter name"
            onChangeHandler={handleChange}
          />

          <CustomFormGroup
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            placeholder="Enter email"
            onChangeHandler={handleChange}
          />

          <Form.Group controlId="isAdmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="my-3"
            disabled={isUpdating}
          >
            {"Update User"}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
