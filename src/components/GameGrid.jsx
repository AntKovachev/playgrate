import React from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";

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
  );
}

export default GameGrid;
