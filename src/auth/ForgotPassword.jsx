import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FORGOT_PASSWORD_ENDPOINT } from '../constants/apiEndpoints';
import '../styles/auth.css';

import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  HEADER_TEXT_COLOR,
  PARAGRAPH_TEXT_COLOR,
  DANGER_TEXT_COLOR,
  SUCCESS_TEXT_COLOR,
} from '../constants/colors';
import { FONTS } from '../constants/fonts'; 
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

 const handleForgotPassword = async (e) => {
  e.preventDefault();

  try {
    await axios.post(FORGOT_PASSWORD_ENDPOINT, { email });

    setError(null);

    toast.success('Password reset link sent, check your spam folder!', {
      position: "top-center"
    });
    
  } catch (err) {
    setError(err.response.data.message);

    toast.error(`Failed to send password reset link! Reason: ${err.response.data.message}`, {
      position: "top-center"
    });
  }
};
  return (
    <div className="auth-page"> 
      <ToastContainer />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="https://merryriana.com/assets/images/mrg.png" alt="Logo" style={{ width: '250px', height: '100px' }} />
      </div>
      <form className="authForm" onSubmit={handleForgotPassword}> 
        <h2 className="text-center" style={{ color: HEADER_TEXT_COLOR, fontFamily: FONTS.heading }}>Forgot Password</h2>
        <p style={{ color: PARAGRAPH_TEXT_COLOR, textAlign: 'center' }}>
  Enter your email address and we'll send you a link to reset your password.
</p>  
        {error && <div className="alert alert-danger" style={{ color: DANGER_TEXT_COLOR }}>{error}</div>}
        <div className="form-group">
          <label style={{ color: PARAGRAPH_TEXT_COLOR }}>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ backgroundColor: SECONDARY_COLOR }}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: SUCCESS_TEXT_COLOR }}>Send Reset Link</button>
        </div>
        <p style={{ color: PARAGRAPH_TEXT_COLOR, textAlign: 'center' }}>
          Remember your password? <Link to="/login" style={{ color: PRIMARY_COLOR }}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;