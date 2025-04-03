import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth/AuthContext";
import { Form, Button, Alert, Card, Container } from "react-bootstrap";

function MyAccount() {
  const { isLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState({
    username: "testuser",
    email: "test@example.com",
  });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();

    console.log("Changing password:", passwords);
    setMessage("Password changed successfully!");
    setPasswords({ currentPassword: "", newPassword: "" });
  };

  if (!isLoggedIn) {
    return (
        <Container className="mt-5 text-center">
            <h2 className="text-light">Access Denied</h2>
            <div className="alert-container">
            <p className="text-warning">You need to log in to access your account.</p>
            <Button href="/login" variant="outline-warning" className="fw-bold">Login</Button>
            </div>
        </Container>
    );
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
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>

          <div>
            <h4 className="text-warning">Change Password</h4>
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handlePasswordChange}>
              <Form.Group className="mb-3">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter current password"
                  value={passwords.currentPassword}
                  onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
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
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
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