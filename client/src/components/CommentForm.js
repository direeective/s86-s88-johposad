import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://s86-s88-backend-api.onrender.com/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ comment }),
      });
      const data = await response.json();
      if (response.ok) {
        onCommentAdded(data);
        setComment('');
      } else {
        console.error('Error submitting comment:', data.message);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formComment">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CommentForm;
