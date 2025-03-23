import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown, Card, Button, Row, Col, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import.meta.env.REACT_APP_API_KEY;
import { useDebounce } from "use-debounce"; // You may need to install this package.

function TopNavbar() {
  const [games, setGames] = useState([]);
  const [category, setCategory] = useState("top");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Debouncing the search term to prevent unnecessary API calls
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // 500ms debounce time

  useEffect(() => {
    fetchGames(category, debouncedSearchTerm);
  }, [category, debouncedSearchTerm]);

  const fetchGames = async (category, searchTerm) => {
    setLoading(true);
    const apiUrl = searchTerm
        ? `http://api.rawg.io/api/games?key=${import.meta.env.VITE_REACT_APP_API_KEY}&ordering=-rating&page_size=10&search=${searchTerm}`
        : `http://api.rawg.io/api/games?key=${import.meta.env.VITE_REACT_APP_API_KEY}&ordering=-rating&page_size=10&category=${category}`;

    try {
      const response = await axios.get(apiUrl);
      setGames(response.data.results);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-dark fixed-top py-3">
        <Container className="d-flex justify-content-between align-items-end" style={{ height: "100%" }}>
          <Navbar.Brand href="#home" className="fs-2 fw-bold text-white">
            <i className="bi bi-controller me-2"></i> PlayGreat
          </Navbar.Brand>

          <Form className="d-flex ms-auto" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="text"
              placeholder="Search for games..."
              className="me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>

          <Nav className="mx-auto">
            <NavDropdown
              title="Games"
              id="basic-nav-dropdown"
              className="text-white fw-bold"
              style={{ color: "white" }}
            >
              <NavDropdown.Item onClick={() => setCategory("top")} className="fs-5">
                Top Games of All Time
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setCategory("new")} className="fs-5">
                New Releases
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setCategory("popular")} className="fs-5">
                Most Popular
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Button variant="warning" className="fw-bold rounded-pill px-4" style={{ marginTop: "8px" }}>
            Register
          </Button>
        </Container>
      </Navbar>

      <Container className="mt-5 pt-5">
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row>
            {games.map((game) => (
              <Col key={game.id} sm={12} md={6} lg={4}>
                <Card className="mb-4">
                  <Card.Img variant="top" src={game.background_image} />
                  <Card.Body>
                    <Card.Title>{game.name}</Card.Title>
                    <Card.Text>{game.released}</Card.Text>
                    <Button variant="primary" onClick={() => alert(`Vote for ${game.name}`)}>
                      Vote
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}

export default TopNavbar;
