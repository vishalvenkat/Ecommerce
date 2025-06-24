import { Form, InputGroup } from "react-bootstrap";
import FormContainer from "../Components/FormContainer.tsx";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    console.log(userData);
  };
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
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
        <Form.Group className="mt-3">
          <Form.Control
            type="submit"
            value="Sign In"
            className="btn btn-primary"
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Text className="text-muted">
            New Customer? <Link to="/register">Register</Link>
          </Form.Text>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Text className="text-muted">
            Forgot Password? <Link to="/forgot-password">Reset Password</Link>
          </Form.Text>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
