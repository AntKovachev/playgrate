import React, { useState } from 'react';
import { Button, Form, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TopNavbar from '../TopNavbar';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/register', { username, email, password });
            setError('');
            setUsername('');
            setEmail('');
            setPassword('');
            navigate('/login', { state: { successMessage: 'Account registered successfully. Please log in.' } });
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <>
            <TopNavbar />
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow-sm rounded">
                    <h3 className="text-center mb-4">Register</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleRegister}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="shadow-sm"
                            />
                        </Form.Group>
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
                        <Button variant="primary" type="submit" className="w-100 py-2 mt-3">Register</Button>
                    </Form>
                </Card>
            </div>
        </>
    );
};

export default Register;
