import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserProfileMutation } from "../slices/userApiSlice";
import Loader from "../Components/Loader.tsx";
import CustomFormGroup from "../Components/CustomFormGroup.tsx";

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    updateUserProfile({
      id: userInfo._id,
      name,
      email,
      password,
    })
      .unwrap()
      .then((res) => {
        if (res) {
          alert("Profile updated successfully");
          dispatch(
            setCredentials({
              ...res,
            })
          );
        }
      })
      .catch((err) => {
        alert(err?.data?.message || "Failed to update profile");
      });
  };

  if (isLoading) {
    return <Loader />;
  }
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
      <Col md={9}></Col>
    </Row>
  );
};

export default ProfileScreen;
