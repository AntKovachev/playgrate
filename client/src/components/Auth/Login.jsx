import React, { useState, useContext } from 'react';
import { Button, Form, Alert, Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setIsLoggedIn, setUserData } = useContext(AuthContext);
    const successMessage = location.state?.successMessage || '';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

            const user = { ...response.data.user, _id: response.data.user.id };
            delete user.id;

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(user));

            setIsLoggedIn(true);
            setUserData({ token: response.data.token, ...user });

            navigate("/");
        } catch (err) {
            console.error("Error during login:", err.response?.data || err.message);
            const errorMessage = err.response?.data?.message || "An unexpected error occurred. Please try again.";
            setError(errorMessage);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow-sm rounded">
                    <h3 className="text-center mb-4">Login</h3>
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="shadow-sm"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="shadow-sm"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 py-2 mt-3">Login</Button>
                    </Form>
                </Card>
            </div>
        </>
    );
};

export default Login;