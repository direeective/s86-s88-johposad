import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { Button, Card, Form, ListGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('https://s86-s88-backend-api.onrender.com/api/auth/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await fetch('https://s86-s88-backend-api.onrender.com/api/posts/user-posts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserDetails();
    fetchUserPosts();
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const handleShowModal = (post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      content: post.content,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdatePost = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${selectedPost._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      const updatedPost = await response.json();
      setPosts(prevPosts => prevPosts.map(post => post._id === updatedPost._id ? updatedPost : post));
      handleCloseModal();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="user-details">
        <p><strong>Username:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <h2>Your Posts</h2>
      <ListGroup>
        {posts.map(post => (
          <ListGroup.Item key={post._id}>
            <Card>
              {post.image && <Card.Img variant="top" src={post.image} alt={post.title} />}
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <Button variant="primary" onClick={() => handleShowModal(post)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeletePost(post._id)}>Delete</Button>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPostTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPostContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdatePost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
