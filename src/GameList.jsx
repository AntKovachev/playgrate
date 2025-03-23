import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Card, Button, Pagination, Spinner } from "react-bootstrap";
import axios from "axios";

function GameList({ category, page, setPage }) {
  const [games, setGames] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [loading, setLoading] = useState(true); // Loading state

  const fetchGames = useCallback(async (category, page) => {
    setLoading(true); // Set loading to true before fetching
    const apiUrl = `https://api.rawg.io/api/games?key=1f858e4eb5de47ae9289c687983bb994&ordering=-rating&page_size=10&page=${page}&genres=${category}`;
    try {
      const response = await axios.get(apiUrl);
      setGames(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10)); // Calculate total pages based on count
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  }, []);

  useEffect(() => {
    fetchGames(category, page);
  }, [category, page, fetchGames]); // Re-run the fetch when category or page changes

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <>
      {/* Show Spinner while loading */}
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

      {/* Pagination */}
      <Pagination>
        <Pagination.Prev
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === page}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        />
      </Pagination>
    </>
  );
}

export default GameList;
