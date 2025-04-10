import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form, Carousel, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth/AuthContext";
import useFetchGameTrailers from "../hooks/useFetchGameTrailers";
import moment from "moment";  // Import moment.js for date formatting

function GameModal({ show, onHide, game }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentSubmitted, setCommentSubmitted] = useState(false); // Added state for submission status
  const { isLoggedIn } = useContext(AuthContext);

  const { trailers, loading: trailersLoading } = useFetchGameTrailers(game?.id);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/comments/${game.id}`
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (game) {
      fetchComments();
    }
  }, [game]);

  const handleCommentSubmit = async () => {
    if (!isLoggedIn) {
      alert("You need to log in to leave a comment.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) {
      alert("User ID not found.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rawg_game_id: game.id,
          user_id: userId,
          comment_text: comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const data = await response.json();
      setComments((prevComments) => [data, ...prevComments]);
      setComment("");

      // Show success message
      setCommentSubmitted(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setCommentSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Something went wrong.");
    }
  };

  if (!game) {
    return null;
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
        <p>
          <strong>Released:</strong> {game.released || "N/A"}
        </p>
        <p>
          <strong>Rating:</strong> {game.rating || "N/A"}
        </p>
        <p>
          <strong>Platforms:</strong>{" "}
          {game.platforms.map((p) => p.platform.name).join(", ")}
        </p>
        <p>
          <strong>Genres:</strong> {game.genres.map((g) => g.name).join(", ")}
        </p>
        {game.metacritic && (
          <p>
            <strong>Metacritic Score:</strong> {game.metacritic}
          </p>
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
        <h5>Comments</h5>
        {comments.length > 0 ? (
          <ul className="list-unstyled">
            {comments.map((comment) => (
              <li key={comment._id} className="mb-3">
                <div className="d-flex align-items-start">
                  <div
                    className="rounded-circle bg-secondary text-light d-flex justify-content-center align-items-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {comment.user_id?.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="ms-3">
                    <p className="mb-1 fw-bold">
                      {comment.user_id?.username || "Unknown User"}
                    </p>
                    <p className="mb-0 text-muted">{comment.comment_text}</p>
                    {/* Display comment time */}
                    <p className="text-muted mt-2" style={{ fontSize: "0.7rem"}}>
                      {moment(comment.createdAt).format("MMMM Do YYYY, h:mm A")}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}

        {isLoggedIn ? (
          <Form>
            {/* Success message */}
            {commentSubmitted && (
              <Alert variant="success" className="text-center mt-3">
                Comment submitted!
              </Alert>
            )}

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
