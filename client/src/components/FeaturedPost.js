import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

const FeaturedPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://s86-s88-backend-api.onrender.com/api/posts/');
        const data = await response.json();
        console.log("Fetched posts:", data); // Debugging log

        if (Array.isArray(data)) {
          const likedPosts = data.filter(post => post.likes && post.likes.length > 0);
          setPosts(likedPosts);
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="featured-posts">
      <h2>Featured Posts</h2>
      <ListGroup>
        {posts.map(post => (
          <ListGroup.Item key={post._id}>
            <Card>
              {post.image && <Image src={post.image} alt={post.title} fluid />}
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <div className="likes">
                  <span>{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</span>
                </div>
                <div className="username">
                  <span>Posted by: {post.user.username}</span>
                </div>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default FeaturedPost;
