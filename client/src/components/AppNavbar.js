import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import UserContext from '../context/UserContext';
import LogoutButton from './LogoutButton';

export default function AppNavbar() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to="/">eBloggy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/posts" exact="true">Blogs</Nav.Link>

            {user ? (
              user.isAdmin ? (
                <>
                  <Nav.Link as={NavLink} to="/admin">Admin Dashboard</Nav.Link>
                  <LogoutButton onLogout={handleLogout} />
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/profile" exact="true">Profile</Nav.Link>
                  <LogoutButton onLogout={handleLogout} />
                </>
              )
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
