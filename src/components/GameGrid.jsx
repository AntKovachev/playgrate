import React, { useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import Badge from "react-bootstrap/esm/Badge";
import GameModal from "./GameModal";

function GameGrid({ games, loading }) {
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    console.log("Selected game:", game);
    setShowModal(true);
  };

  return (
    <Container className="pt-3">
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="light" />
        </div>
      ) : (
        <Row className="g-4">
          {games.map((game) => (
            <Col key={game.id} xs={12} sm={6} md={4}>
              <Card
                className="bg-dark text-light h-100"
                onClick={() => handleGameClick(game)} // Handle click
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src={game.background_image || "https://via.placeholder.com/300"}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
                  <Card.Text>Rating: {game.rating || "N/A"}</Card.Text>
                  <Card.Text>📅 Released: {game.released}</Card.Text>
                  <Card.Text>
                    ⭐ Rating: {game.rating} / {game.rating_top}
                  </Card.Text>
                  {game.metacritic && (
                    <Card.Text>
                      🎯 Metacritic: <Badge bg="success">{game.metacritic}</Badge>
                    </Card.Text>
                  )}
                  <Card.Text>
                    🎮 Platforms: {game.platforms.map(p => p.platform.name).join(", ")}
                  </Card.Text>
                  <Card.Text>
                    🏷 Genres: {game.genres.map(g => g.name).join(", ")}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {/* Game Modal */}
      {selectedGame && (
        <GameModal
          show={showModal}
          onHide={() => setShowModal(false)}
          game={selectedGame}
        />
      )}
    </Container>
  );
}

export default GameGrid;