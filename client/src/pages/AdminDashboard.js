import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const AdminDashboard = () => {
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch all posts
        fetch('https://s86-s88-backend-api.onrender.com/api/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const deletePost = (postId) => {
        fetch(`https://s86-s88-backend-api.onrender.com/api/posts/${postId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted post from the state
                    setPosts(posts.filter(post => post.id !== postId));
                } else {
                    console.error('Error deleting post');
                }
            })
            .catch(error => console.error('Error deleting post:', error));
    };

    if (user && user.isAdmin) {
        return (
            <Container>
                <h1 className="my-4 text-center">Admin Dashboard</h1>
                <Row>
                    {posts.map(post => (
                        <Col key={post.id} sm={12} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>{post.content}</Card.Text>
                                    <Button variant="danger" onClick={() => deletePost(post.id)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    } else {
        return <h1 className="text-center my-5">Access Denied</h1>;
    }
};

export default AdminDashboard;
