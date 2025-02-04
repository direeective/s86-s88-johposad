import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import UserContext from '../context/UserContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await fetch('https://s86-s88-backend-api.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check for non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        setError('Unexpected server response. Please try again later.');
        return;
      }

      const data = await response.json();

      if (response.ok) {
        // Store the token
        console.log('Token:', data.token); // Log the token for debugging
        localStorage.setItem('token', data.token); // Ensure the token is stored
        // Update the user context
        setUser({ id: data.id, isAdmin: data.isAdmin });
        // Redirect to the blog page
        navigate('/Blogs');
      } else {
        setError(data.message || 'Failed to log in');
      }
    } catch (error) {
      setError('Error logging in: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="loginEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter email" 
            required 
          />
        </Form.Group>
        <Form.Group controlId="loginPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter password" 
            required 
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
