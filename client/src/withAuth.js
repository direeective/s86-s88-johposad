import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import UserContext from './context/UserContext';

const withAuth = (WrappedComponent, isAdminRequired = false) => {
  return (props) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token || (isAdminRequired && (!user || !user.isAdmin))) {
        navigate('/login');
      }
    }, [navigate, user, isAdminRequired]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
