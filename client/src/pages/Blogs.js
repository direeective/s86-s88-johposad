import withAuth from '../withAuth'; // Ensure this HOC checks authentication
import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import CreatePostModal from '../components/CreatePostModal';
import CommentForm from '../components/CommentForm';

function Blogs() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://s86-s88-backend-api.onrender.com/api/posts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token
          },
        });
        const data = await response.json();
        console.log("Fetched posts:", data); // Debugging log
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCommentAdded = (postId, newComment) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post._id === postId ? { ...post, comments: [...post.comments, newComment] } : post
    ));
  };

  return (
    <div>
      <Row className="my-4">
        {posts.map((post, index) => (
          <Col xs={12} md={6} lg={4} key={index} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Card.Title>
                  <h2>{post.title}</h2>
                </Card.Title>
                <Card.Text>
                  {post.content}
                </Card.Text>
                <div className="likes">
                  <span>{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</span>
                </div>
                <div className="username">
                  <span>Posted by: {post.user.username}</span>
                </div>
                <div className="comments">
                  <h5>Comments:</h5>
                  <ListGroup>
                    {post.comments.map((comment, commentIndex) => (
                      <ListGroup.Item key={commentIndex}>
                        <strong>{comment.user.username}:</strong> {comment.comment}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <CommentForm postId={post._id} onCommentAdded={(newComment) => handleCommentAdded(post._id, newComment)} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <Col xs={12} className="text-center">
          <Button variant="primary" onClick={handleShowModal}>Add New Post</Button>
        </Col>
      </Row>

      <CreatePostModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default withAuth(Blogs); // Apply the withAuth HOC to the Blogs component
