// src/components/Signup.js
import React, { useState } from 'react';
import api from '../api';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', formData);
      setSuccess('User created successfully!');
      setError(null);
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <Container className="my-4">
      <h2 className="text-center">Signup</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" placeholder="Enter username" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Enter password" onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;
