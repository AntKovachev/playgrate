import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown, Card, Button, Row, Col, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { useDebounce } from "use-debounce"; // You may need to install this package.

function TopNavbar() {
  const [games, setGames] = useState([]);
  const [category, setCategory] = useState("top-rated");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Debounce to limit API calls
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    fetchGames(category, debouncedSearchTerm);
  }, [category, debouncedSearchTerm]);

  const fetchGames = async (category, searchTerm) => {
    setLoading(true);

    // Base API URL
    let apiUrl = `https://api.rawg.io/api/games?key=19e2812a3b574f739acba93c39ae2213&page_size=10`;

    if (searchTerm) {
      apiUrl += `&search=${searchTerm}`;
    }

    // Define different API ordering parameters
    const categoryOrdering = {
      "top-rated": "-rating",
      "best-of-all-time": "-metacritic",
      "new-releases": "-released",
      "most-popular": "-added",
      "best-sellers": "-suggestions",
      "trending": "-updated"
    };

    if (categoryOrdering[category]) {
      apiUrl += `&ordering=${categoryOrdering[category]}`;
    }

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
      {/* Responsive Navbar */}
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

            {/* Dropdown with multiple categories */}
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

            <Button variant="warning" className="fw-bold rounded-pill px-4 my-2 my-lg-0">
              Register
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Games List */}
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
                    <Card.Text>📅 {game.released}</Card.Text>
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
