import React, { useState } from "react";
import { Modal, Button, Form, Carousel, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFetchGameTrailers from "../hooks/useFetchGameTrailers";

function GameModal({ show, onHide, game }) {
  const [comment, setComment] = useState("");
  const isLoggedIn = false; // Replace with actual authentication logic

  // Fetch trailers for the selected game
  const { trailers, loading: trailersLoading } = useFetchGameTrailers(game?.id);

  const handleCommentSubmit = () => {
    if (!isLoggedIn) {
      alert("You need to log in to leave a comment.");
      return;
    }
    console.log("Comment submitted:", comment);
    setComment(""); // Clear the comment field
  };

  if (!game) {
    return null; // Return null if game is undefined
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{game.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Screenshot Carousel */}
        {game.short_screenshots && game.short_screenshots.length > 0 ? (
          <Carousel className="mb-3">
            {game.short_screenshots.map((screenshot) => (
              <Carousel.Item key={screenshot.id}>
                <img
                  src={screenshot.image}
                  alt="Game Screenshot"
                  className="d-block w-100 rounded"
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <img
            src={game.background_image || "https://via.placeholder.com/300"}
            alt={game.name}
            className="img-fluid mb-3 rounded"
          />
        )}

        {/* Game Details */}
        <p><strong>Released:</strong> {game.released || "N/A"}</p>
        <p><strong>Rating:</strong> {game.rating || "N/A"}</p>
        <p><strong>Platforms:</strong> {game.platforms.map(p => p.platform.name).join(", ")}</p>
        <p><strong>Genres:</strong> {game.genres.map(g => g.name).join(", ")}</p>
        {game.metacritic && (
          <p><strong>Metacritic Score:</strong> {game.metacritic}</p>
        )}
        <p>{game.description || "No description available."}</p>
        <hr />

        {/* Trailers Section */}
        <h5>Trailers</h5>
        {trailersLoading ? (
          <div className="d-flex justify-content-center my-3">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : trailers.length > 0 ? (
          <Carousel className="mb-3">
            {trailers.map((trailer) => (
              <Carousel.Item key={trailer.id}>
                <video
                  controls
                  className="d-block w-100 rounded"
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                >
                  <source src={trailer.data.max} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <Carousel.Caption>
                  <h6>{trailer.name}</h6>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <p>No trailers available for this game.</p>
        )}

        <hr />

        {/* Comment Section */}
        {isLoggedIn ? (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Leave a Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleCommentSubmit}>
              Submit Comment
            </Button>
          </Form>
        ) : (
          <p>
            <Link to="/login">Log in</Link> to leave a comment.
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default GameModal;