import React from "react";
import { Nav } from "react-bootstrap";

function Sidebar({ setCategory }) {
  const categories = [
    { id: "top-rated", label: "Top Rated", icon: "bi bi-star-fill text-warning" },
    { id: "best-of-all-time", label: "Best of All Time", icon: "bi bi-trophy-fill text-success" },
    { id: "new-releases", label: "New Releases", icon: "bi bi-calendar-event-fill text-primary" },
    { id: "most-popular", label: "Most Popular", icon: "bi bi-fire text-danger" },
    { id: "best-sellers", label: "Best Sellers", icon: "bi bi-cart-fill text-info" },
    { id: "trending", label: "Trending Now", icon: "bi bi-graph-up-arrow text-warning" },
  ];

  return (
    <div className="bg-secondary p-3 rounded">
      <h4 className="fw-bold mb-4 text-light">Categories</h4>
      <Nav className="flex-column">
        {categories.map((category) => (
          <Nav.Link
            key={category.id}
            onClick={() => {setCategory(category.id);}}
            className="text-light d-flex align-items-center mb-2 fs-5"
            style={{ cursor: "pointer" }}
          >
            <i className={`${category.icon} me-2`}></i>
            {category.label}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
}

export default Sidebar;