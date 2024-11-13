// src/components/AddProduct.js
import React, { useState } from 'react';
import api from '../api';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function AddProduct() {
  const [productData, setProductData] = useState({ name: '', price: '', description: '', category: '' });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', productData);
      setSuccess('Product added successfully!');
      setError(null);
      setProductData({ name: '', price: '', description: '', category: '' }); // Reset form
    } catch (error) {
      setError('Failed to add product. Please try again.');
    }
  };

  return (
    <Container className="my-4">
      <h2>Add Product</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter product name" value={productData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" placeholder="Enter product price" value={productData.price} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" placeholder="Enter product description" value={productData.description} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" placeholder="Enter product category" value={productData.category} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Add Product
        </Button>
      </Form>
    </Container>
  );
}

export default AddProduct;
