import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RESET_PASSWORD_ENDPOINT } from '../constants/apiEndpoints';
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
import { Link, useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const email = params.get('email');

    if (token && email) {
      setToken(token);
      setEmail(email);
    } else {
      setError('Invalid or missing token and email.');
    }
  }, [location]);

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError(null);
    }
  }, [password, confirmPassword]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (error) {
      return;
    }

    try {
      await axios.post(RESET_PASSWORD_ENDPOINT, {
        email,
        token,
        password,
        password_confirmation: confirmPassword
      });

      setError(null);

      toast.success('Password reset successful!', {
        position: "top-center",
        onClose: () => navigate('/login', { state: { fromResetPassword: true } })
      });

    } catch (err) {
      setError(err.response.data.message);

      toast.error(`Failed to reset password! Reason: ${err.response.data.message}`, {
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
      <form className="authForm" onSubmit={handleResetPassword}> 
        <h2 className="text-center" style={{ color: HEADER_TEXT_COLOR, fontFamily: FONTS.heading }}>Reset Password</h2>
        <p style={{ color: PARAGRAPH_TEXT_COLOR, textAlign: 'center' }}>
          Enter your new password.
        </p>
        {error && <div className="alert alert-danger" style={{ color: DANGER_TEXT_COLOR }}>{error}</div>}
        <div className="form-group">
          <label style={{ color: PARAGRAPH_TEXT_COLOR }}>New Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ backgroundColor: SECONDARY_COLOR }}
          />
        </div>
        <div className="form-group">
          <label style={{ color: PARAGRAPH_TEXT_COLOR }}>Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ backgroundColor: SECONDARY_COLOR }}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: SUCCESS_TEXT_COLOR }}>Reset Password</button>
        </div>
        <p style={{ color: PARAGRAPH_TEXT_COLOR, textAlign: 'center' }}>
          Remember your password? <Link to="/login" style={{ color: PRIMARY_COLOR }}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;