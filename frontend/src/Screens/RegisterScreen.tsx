import { Form, InputGroup } from "react-bootstrap";
import FormContainer from "../Components/FormContainer.tsx";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import AlertMessage from "../Components/AlertMessage.tsx";

const RegisterScreen = () => {
  /**
   * This part of the code checks if the user is already logged in.
   * If the user is logged in, it redirects them to the page they were trying to
   * access before logging in, or to the home page if no specific page was requested.
   */
  // Import userInfo from Redux state using useSelector
  const { userInfo } = useSelector((state: any) => state.auth);

  // Get the current URL's search query string (e.g., ?redirect=/cart)
  const { search } = useLocation();

  // Extract the value of the "redirect" query parameter from the URL.
  // If it doesn't exist, default to "/"
  const redirect = new URLSearchParams(search).get("redirect") || "/";

  // useNavigate is a hook from React Router to programmatically change the route
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      // Navigate to the redirect path (either from the query string or default "/")
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userInfo = {
      name,
      email,
      password,
    };

    register(userInfo)
      .unwrap()
      .then((user) => {
        dispatch(setCredentials(user));
        navigate(redirect);
      })
      .catch((error) => {
        // Handle error (e.g., show an alert or message)
        <AlertMessage variant="danger">
          {error?.data?.message || "Registration failed. Please try again."}
        </AlertMessage>;
      });
  };
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your good name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="example.email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="*********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroup.Text
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder="*********"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputGroup.Text
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ cursor: "pointer" }}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            type="submit"
            value="Register"
            className="btn btn-primary"
            disabled={isLoading}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Text className="text-muted">
            Already have an account?{" "}
            <Link
              to={redirect !== "/" ? `/login?redirect=${redirect}` : `/login`}
            >
              Login
            </Link>
          </Form.Text>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
