// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError('Could not load products. Please try again later.');
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      setError('Failed to delete product.');
    }
  };

  return (
    <Container>
      <h2 className="text-center my-4">Product List</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <h5 className="text-success">${product.price}</h5>
                  <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
                  <Button variant="warning" as={Link} to={`/edit-product/${product._id}`} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => deleteProduct(product._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ProductList;
