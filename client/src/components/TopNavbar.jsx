import React, { useContext, useState } from "react";
import { Container, Navbar, Button, Nav, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth/AuthContext";
import SearchBar from "./SearchBar";

function TopNavbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [logoutMessage, setLogoutMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setLogoutMessage("You have been logged out successfully.");
    setTimeout(() => setLogoutMessage(""), 3000);
  };

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  return (
    <>
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
                <>
                  <Nav.Link
                    as={Link}
                    to="/my-account"
                    className="text-light fw-bold me-3"
                  >
                    My Account
                  </Nav.Link>
                  <Button
                    variant="light"
                    className="fw-bold rounded-pill px-4 me-2"
                    style={{ minWidth: "120px" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
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

      {/* Display logout message */}
      {logoutMessage && (
        <Alert variant="success" className="text-center mt-5">
          {logoutMessage}
        </Alert>
      )}
    </>
  );
}

export default TopNavbar;