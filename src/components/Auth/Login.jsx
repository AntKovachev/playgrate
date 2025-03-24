import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import TopNavbar from '../TopNavbar';

const Login = () => {
    const location = useLocation();
    const successMessage = location.state?.successMessage || '';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        // Add login logic here
    };

    return (
        <>
        <TopNavbar />
        <Form onSubmit={handleLogin}>
            <h3>Login</h3>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
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
        </>
    );
};

export default Login;