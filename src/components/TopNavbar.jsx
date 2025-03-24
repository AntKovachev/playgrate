import React from "react";
import { Container, Navbar, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function TopNavbar({ setCategory, searchTerm, setSearchTerm }) {
  return (
    <Navbar expand="lg" className="bg-dark fixed-top py-3 shadow-sm">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="fs-2 fw-bold text-light d-flex align-items-center">
          <i className="bi bi-controller me-2"></i> PlayGreat
        </Navbar.Brand>

        {/* Navbar Toggle for Mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" className="bg-light" />

        {/* Navbar Content */}
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          {/* Search Bar */}
          <Form
            className="d-flex ms-auto my-2 my-lg-0 align-items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <Form.Control
              type="text"
              placeholder="Search games, reviews, or news..."
              className="me-2 shadow-sm rounded-pill bg-light border-0 text-dark"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ minWidth: "250px" }}
            />
            <Button
              variant="light"
              className="fw-bold shadow-sm rounded-pill px-4"
              style={{ minWidth: "130px" }}
            >
              <i className="bi bi-search me-2"></i> Search
            </Button>
          </Form>

          <div className="d-flex align-items-center ms-auto">
            <Button
              as={Link}
              to="/login"
              variant="light"
              className="fw-bold rounded-pill px-4 me-2"
              style={{ minWidth: "120px" }}
            >
              Login
            </Button>
            <Button
              as={Link}
              to="/register"
              variant="light"
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