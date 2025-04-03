import React, { useContext, useState } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth/AuthContext";
import SearchBar from "./SearchBar";

function TopNavbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  return (
    <Navbar expand="lg" className="bg-dark fixed-top py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fs-2 fw-bold text-light d-flex align-items-center">
          <i className="bi bi-controller me-2"></i> PlayGreat
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" className="bg-light" />

        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
          />

          <div className="d-flex align-items-center ms-auto">
            {isLoggedIn ? (
              <Button
                variant="light"
                className="fw-bold rounded-pill px-4 me-2"
                style={{ minWidth: "120px" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="light"
                  className="fw-bold rounded-pill px-4 me-2"
                  style={{ minWidth: "120px" }}
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="light"
                  className="fw-bold rounded-pill px-4"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;