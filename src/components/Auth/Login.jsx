import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email, password });
            setToken(response.data.token);
            setError('');
        } catch (err) {
            setError(err.response.data.error || 'Invalid credentials');
            setToken('');
        }
    };

    return (
        <Form onSubmit={handleLogin}>
            <h3>Login</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {token && <Alert variant="success">Logged in successfully</Alert>}
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit">Login</Button>
        </Form>
    );
};

export default Login;
