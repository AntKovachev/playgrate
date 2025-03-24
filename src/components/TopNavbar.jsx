import React from "react";
import { Container, Nav, Navbar, NavDropdown, Form, Button } from "react-bootstrap";

function TopNavbar({setCategory, searchTerm, setSearchTerm }) {
  return (
    <Navbar expand="lg" className="bg-dark fixed-top py-3">
      <Container>
        <Navbar.Brand href="#home" className="fs-2 fw-bold text-white">
          <i className="bi bi-controller me-2"></i> PlayGreat
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" className="bg-light" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <Form className="d-flex ms-auto my-2 my-lg-0" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="text"
              placeholder="Search for games..."
              className="me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>

          <Nav className="mx-auto">
            <NavDropdown title={<span className="text-white fs-5 fw-bold">Categories</span>} id="game-categories">
              <NavDropdown.Item onClick={() => setCategory("top-rated")} className="fs-5">🏆 Top Rated</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setCategory("best-of-all-time")} className="fs-5">🎮 Best of All Time</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setCategory("new-releases")} className="fs-5">🆕 New Releases</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setCategory("most-popular")} className="fs-5">🔥 Most Popular</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setCategory("best-sellers")} className="fs-5">🏅 Best Sellers</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setCategory("trending")} className="fs-5">🎭 Trending Now</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Button variant="warning" className="fw-bold rounded-pill px-4 my-2 my-lg-0 mx-5">
            Register
          </Button>
          <Button variant="warning" className="fw-bold rounded-pill px-4 my-2 my-lg-0">
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
