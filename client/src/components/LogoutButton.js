import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Button variant="secondary" onClick={handleLogout} className="ml-2">
      Logout
    </Button>
  );
}
