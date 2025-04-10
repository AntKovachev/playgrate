import React, { useState } from "react";
import { Form, InputGroup, Button, ListGroup, Spinner } from "react-bootstrap";
import useFetchGames from "../hooks/useFetchGames";

function SearchBar({ searchTerm, setSearchTerm, onSearch, onGameSelect }) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");
  const { games: suggestions, loading } = useFetchGames(null, localSearchTerm);

  const handleSelect = (game) => {
    setSearchTerm(game.name);
    setLocalSearchTerm(game.name);
    if (onSearch) {
      onSearch(game.name);
    }
    if (onGameSelect) {
      onGameSelect(game); // Trigger the callback when a game is selected
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(localSearchTerm);
    }
  };

  return (
    <div className="search-bar position-relative">
      <Form className="d-flex align-items-center" onSubmit={handleSearch}>
        <InputGroup className="shadow-sm rounded-pill">
          <Form.Control
            type="text"
            placeholder="Search games, reviews, or news..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="rounded-pill border-0 bg-light text-dark"
            style={{ minWidth: "300px" }}
          />
          <Button
            type="submit"
            variant="warning"
            className="fw-bold rounded-pill px-4"
            style={{ minWidth: "130px" }}
          >
            <i className="bi bi-search me-2"></i> Search
          </Button>
        </InputGroup>
      </Form>

      {/* Suggestions Dropdown */}
      {localSearchTerm && suggestions.length > 0 && (
        <ListGroup className="position-absolute w-100 shadow-sm mt-1">
          {loading ? (
            <ListGroup.Item className="text-center">
              <Spinner animation="border" size="sm" />
            </ListGroup.Item>
          ) : (
            suggestions.map((game) => (
              <ListGroup.Item
                key={game.id}
                action
                onClick={() => handleSelect(game)}
                className="d-flex align-items-center"
              >
                <img
                  src={
                    game.background_image || "https://via.placeholder.com/50"
                  }
                  alt={game.name}
                  className="me-2 rounded"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                {game.name}
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      )}
    </div>
  );
}

export default SearchBar;
