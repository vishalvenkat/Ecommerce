import { Nav, Navbar, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser, FaShopify } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getNoOfItemsInCart } from "../utils/cartUtils";
import { useLogoutMutation } from "../slices/userApiSlice";
import AlertMessage from "./AlertMessage.tsx";
import { removeCredentials } from "../slices/authSlice";

export const Header = () => {
  // cart is from redux store.js
  // useSelector is used to access the redux store state
  const { orderItems } = useSelector((state: any) => state.cart);
  const { userInfo } = useSelector((state: any) => state.auth);

  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout({})
      .unwrap()
      .then(() => {
        <AlertMessage variant="Success">User Logged out</AlertMessage>;
        dispatch(removeCredentials());
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const signInLink = userInfo ? (
    <NavDropdown
      title={
        <>
          <FaUser />
          {userInfo.name}
        </>
      }
      id="username"
    >
      <NavDropdown.Item as={Link} to="/profile">
        Profile
      </NavDropdown.Item>
      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
    </NavDropdown>
  ) : (
    <Link to="/login" className="nav-link">
      <FaUser />
      Sign In
    </Link>
  );

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <FaShopify /> Potti Kada
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/cart" className="nav-link">
                <FaShoppingCart />
                Cart
                {orderItems.length > 0 && (
                  <Badge pill bg="success" className="ms-1">
                    {getNoOfItemsInCart(orderItems)}
                  </Badge>
                )}
              </Link>
              {signInLink}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
