import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('https://s86-s88-backend-api.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      // Check for non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        setError('Unexpected server response. Please try again later.');
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/Login');
        }, 2000);
      } else {
        setError(data.message || 'Failed to register');
      }
    } catch (error) {
      setError('Error registering: ' + error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="registerUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter username" 
            required 
          />
        </Form.Group>
        <Form.Group controlId="registerEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter email" 
            required 
          />
        </Form.Group>
        <Form.Group controlId="registerPassword" className="mb-3">
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
          Register
        </Button>
      </Form>
    </div>
  );
}
