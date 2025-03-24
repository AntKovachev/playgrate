import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function GameModal({ show, onHide, game }) {
  const [comment, setComment] = useState("");
  const isLoggedIn = false; // Replace with actual authentication logic

  const handleCommentSubmit = () => {
    if (!isLoggedIn) {
      alert("You need to log in to leave a comment.");
      return;
    }
    console.log("Comment submitted:", comment);
    setComment(""); // Clear the comment field
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{game.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={game.background_image || "https://via.placeholder.com/300"}
          alt={game.name}
          className="img-fluid mb-3 rounded"
        />
        <p><strong>Released:</strong> {game.released || "N/A"}</p>
        <p><strong>Rating:</strong> {game.rating || "N/A"}</p>
        <p><strong>Platforms:</strong> {game.platforms.map(p => p.platform.name).join(", ")}</p>
        <p><strong>Genres:</strong> {game.genres.map(g => g.name).join(", ")}</p>
        <p>{game.description || "No description available."}</p>
        <hr />
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