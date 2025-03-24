import React from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function TopNavbar({ setCategory, searchTerm, setSearchTerm }) {
  return (
    <Navbar expand="lg" className="bg-dark fixed-top py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fs-2 fw-bold text-warning">
          <i className="bi bi-controller me-2"></i> PlayGreat
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" className="bg-light" />

        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <Form
            className="d-flex ms-auto my-2 my-lg-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <Form.Control
              type="text"
              placeholder="Search games, reviews, or news..."
              className="me-2 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="warning" className="fw-bold shadow-sm">
              Search
            </Button>
          </Form>

          <Nav className="mx-auto">
            <NavDropdown
              title={
                <span className="text-white fs-5 fw-bold">Categories</span>
              }
              id="game-categories"
              menuVariant="dark"
              className="categories-dropdown"
            >
              <NavDropdown.Item
                onClick={() => setCategory("top-rated")}
                className="fs-6 d-flex align-items-center"
              >
                <i className="bi bi-star-fill text-warning me-2"></i> Top Rated
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => setCategory("best-of-all-time")}
                className="fs-6 d-flex align-items-center"
              >
                <i className="bi bi-trophy-fill text-success me-2"></i> Best of
                All Time
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => setCategory("new-releases")}
                className="fs-6 d-flex align-items-center"
              >
                <i className="bi bi-calendar-event-fill text-primary me-2"></i>{" "}
                New Releases
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => setCategory("most-popular")}
                className="fs-6 d-flex align-items-center"
              >
                <i className="bi bi-fire text-danger me-2"></i> Most Popular
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => setCategory("best-sellers")}
                className="fs-6 d-flex align-items-center"
              >
                <i className="bi bi-cart-fill text-info me-2"></i> Best Sellers
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => setCategory("trending")}
                className="fs-6 d-flex align-items-center"
              >
                <i className="bi bi-graph-up-arrow text-warning me-2"></i>{" "}
                Trending Now
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <div className="d-flex align-items-center">
            <Button
              as={Link}
              to="/login"
              variant="outline-warning"
              className="fw-bold rounded-pill px-4 me-2"
            >
              Login
            </Button>
            <Button
              as={Link}
              to="/register"
              variant="warning"
              className="fw-bold rounded-pill px-4"
            >
              Register
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
