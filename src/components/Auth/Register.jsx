import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/register', { username, email, password });
            setSuccess('Registration successful');
            setError('');
        } catch (err) {
            setError(err.response.data.error || 'An error occurred');
            setSuccess('');
        }
    };

    return (
        <Form onSubmit={handleRegister}>
            <h3>Register</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit">Register</Button>
        </Form>
    );
};

export default Register;
