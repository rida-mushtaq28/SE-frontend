// src/components/AuthModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import api from '../api';

function AuthModal({ show, onHide, onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignup ? '/auth/signup' : '/auth/login';
      const response = await api.post(endpoint, formData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        onLoginSuccess();
      }
    } catch (error) {
      setError(isSignup ? 'Signup failed. Please try again.' : 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isSignup ? 'Signup' : 'Login'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          {isSignup && (
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" placeholder="Enter username" onChange={handleChange} required />
            </Form.Group>
          )}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter password" onChange={handleChange} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            {isSignup ? 'Signup' : 'Login'}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="link" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AuthModal;
