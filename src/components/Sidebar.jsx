import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import "../assets/css/Sidebar.css";

function Sidebar({ setCategory }) {
  const [activeCategory, setActiveCategory] = useState("top-rated");

  const categories = [
    { id: "top-rated", label: "Top Rated", icon: "bi bi-star-fill text-warning" },
    { id: "best-of-all-time", label: "Best of All Time", icon: "bi bi-trophy-fill text-success" },
    { id: "new-releases", label: "New Releases", icon: "bi bi-calendar-event-fill text-primary" },
    { id: "most-popular", label: "Most Popular", icon: "bi bi-fire text-danger" },
    { id: "best-sellers", label: "Best Sellers", icon: "bi bi-cart-fill text-info" },
    { id: "trending", label: "Trending Now", icon: "bi bi-graph-up-arrow text-warning" },
  ];

  useEffect(() => {
    setCategory("top-rated");
  }, [setCategory]);

  const handleCategoryClick = (categoryId) => {
    setCategory(categoryId);
    setActiveCategory(categoryId);
  };

  return (
    <div className="sidebar d-flex flex-column">
      <h4 className="text-light">Categories</h4>
      <Nav className="flex-column">
        {categories.map((category) => (
          <Nav.Link
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`nav-link d-flex align-items-center ${
              activeCategory === category.id ? "active" : ""
            }`}
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
