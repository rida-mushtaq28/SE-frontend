// src/components/EditProduct.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function EditProduct() {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [productData, setProductData] = useState({ name: '', price: '', description: '', category: '' });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProductData(response.data);
      } catch (error) {
        setError('Failed to fetch product details.');
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, productData);
      setSuccess('Product updated successfully!');
      setError(null);
      navigate('/products'); // Redirect to product list after update
    } catch (error) {
      setError('Failed to update product. Please try again.');
    }
  };

  return (
    <Container className="my-4">
      <h2>Edit Product</h2>
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
          Update Product
        </Button>
      </Form>
    </Container>
  );
}

export default EditProduct;
