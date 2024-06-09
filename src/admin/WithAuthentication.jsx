import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const withAuthentication = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const token = localStorage.getItem('jwtToken'); 
    const navigate = useNavigate();

    useEffect(() => {
      if (!token) {
        navigate('/login', { state: { fromAdmin: true } });
      } else {
        setIsAuthenticated(true);
      }
    }, [token, navigate]);

    if (!isAuthenticated) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthentication;