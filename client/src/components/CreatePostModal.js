import { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

export default function CreatePostModal({ show, handleClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before submitting
    
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    if (!token) {
      setError('No token found. Please log in again.');
      return;
    }

    console.log('Token:', token); // Log the token for debugging

    try {
      const response = await fetch('https://s86-s88-backend-api.onrender.com/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the authorization token
        },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        handleClose();
        window.location.reload(); // Reload the page to show the new post
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create post');
      }
    } catch (error) {
      setError('Error creating post: ' + error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="postTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter post title" 
              required 
            />
          </Form.Group>
          <Form.Group controlId="postContent" className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={5} 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Enter post content" 
              required 
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
