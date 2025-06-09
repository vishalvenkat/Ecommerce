import { Nav, Navbar, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser, FaShopify } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Header = () => {
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
