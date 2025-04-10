import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth/AuthContext";
import { Form, Button, Alert, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyAccount() {
  const { isLoggedIn, userData, loading } = useContext(AuthContext);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) { // Wait for loading to complete
      navigate("/login");
    }
  }, [isLoggedIn, loading, navigate]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/change-password",
        {
          id: userData._id,
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      setMessage(response.data.message);
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (error) {
      console.error("Error changing password:", error);
      setError(error.response?.data?.error || "An error occurred.");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return (
    <Container className="mt-5">
      <Card className="bg-dark text-light shadow-lg">
        <Card.Header className="text-center">
          <h2>My Account</h2>
        </Card.Header>
        <Card.Body>
          <div className="mb-4">
            <h4 className="text-warning">Account Information</h4>
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
          </div>

          <div>
            <h4 className="text-warning">Change Password</h4>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handlePasswordChange}>
              <Form.Group className="mb-3">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter current password"
                  value={passwords.currentPassword}
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      currentPassword: e.target.value,
                    })
                  }
                  required
                  className="bg-secondary text-light border-0"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={passwords.newPassword}
                  onChange={(e) =>
                    setPasswords({ ...passwords, newPassword: e.target.value })
                  }
                  required
                  className="bg-secondary text-light border-0"
                />
              </Form.Group>
              <Button type="submit" variant="warning" className="fw-bold">
                Change Password
              </Button>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MyAccount;