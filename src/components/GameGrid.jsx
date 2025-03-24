import React from "react";
import { Container, Row, Col, Card, Button, Spinner, Badge } from "react-bootstrap";
import "../assets/css/GameGrid.css";

function GameGrid({ games, loading }) {
  return (
    <Container className="mt-5 pt-5">
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          {games.map((game) => (
            <Col key={game.id} sm={12} md={6} lg={4}>
              <Card className="mb-4 game-card">
                <Card.Img variant="top" src={game.background_image} />
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
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
    </Container>
  );
}

export default GameGrid;
