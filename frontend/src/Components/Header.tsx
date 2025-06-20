import { Nav, Navbar, Container, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser, FaShopify } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNoOfItemsInCart } from "../utils/cartUtils";

export const Header = () => {
  // cart is from redux store.js
  // useSelector is used to access the redux store state
  const { cartItems } = useSelector((state: any) => state.cart);

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
                {cartItems.length > 0 && (
                  <Badge pill bg="success" className="ms-1">
                    {getNoOfItemsInCart(cartItems)}
                  </Badge>
                )}
              </Link>
              <Link to="/login" className="nav-link">
                <FaUser />
                Sign In
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
