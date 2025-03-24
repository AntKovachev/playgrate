import React from "react";
import { Nav } from "react-bootstrap";
import "../assets/css/Sidebar.css";

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
    <div className="sidebar d-flex flex-column">
      <h4 className="text-light">Categories</h4>
      <Nav className="flex-column">
        {categories.map((category) => (
          <Nav.Link
            key={category.id}
            onClick={() => setCategory(category.id)}
            className="nav-link d-flex align-items-center"
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