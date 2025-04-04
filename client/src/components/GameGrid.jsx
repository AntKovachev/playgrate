import React, { useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import GameModal from "./GameModal";
import CustomPagination from "./Pagination";

function GameGrid({ games, loading }) {
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const gamesPerPage = 9; // Number of games per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(games.length / gamesPerPage);

  const paginatedGames = games.slice(
    (currentPage - 1) * gamesPerPage,
    currentPage * gamesPerPage
  );

  const handleGameClick = (game) => {
    console.log("Game clicked:", game);
    setSelectedGame(game);
    setShowModal(true);
  };

  return (
    <Container className="pt-3">
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="light" />
        </div>
      ) : (
        <>
          <Row className="g-4">
            {paginatedGames.map((game) => (
              <Col key={game.id} xs={12} sm={6} md={4}>
                <Card
                  className="bg-dark text-light h-100"
                  onClick={() => handleGameClick(game)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img
                    variant="top"
                    src={game.background_image || "https://via.placeholder.com/300"}
                    style={{ objectFit: "cover", height: "150px" }} // Rectangular images
                  />
                  <Card.Body>
                    <Card.Title>{game.name}</Card.Title>
                    <Card.Text>⭐ Rating: {game.rating || "N/A"}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

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