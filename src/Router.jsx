import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import 'animate.css';
import Login from './auth/Login.jsx'; 
import Register from './auth/Register.jsx'; 
import Forgot from './auth/ForgotPassword.jsx';
import './styles/animation.css'; 
import ResetPassword from './auth/ResetPassword.jsx';
import Admin from './admin/Admin.jsx'; 
import withAuthentication from './admin/WithAuthentication.jsx';

const AuthenticatedAdmin = withAuthentication(Admin); 

const AnimatedRoutes = () => {
  let location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/login" element={<div key={location.key} className="animate__animated animate__fadeInDown"><Login /></div>} /> 
      <Route path="/register" element={<div key={location.key} className="animate__animated animate__fadeInDown"><Register /></div>} />
      <Route path="/forgot" element={<div key={location.key} className="animate__animated animate__fadeInDown"><Forgot /></div>} />
      <Route path="/reset-password" element={<div key={location.key} className="animate__animated animate__fadeInDown"><ResetPassword /></div>} />
      <Route path="/admin" element={<div key={location.key} className="animate__animated animate__fadeInDown"><AuthenticatedAdmin /></div>} /> {/* Use the AuthenticatedAdmin component */}

      {/* Add more routes as needed */}
    </Routes>
  );
};

const Router = () => (
  <BrowserRouter>
    <AnimatedRoutes />
  </BrowserRouter>
);

export default Router;