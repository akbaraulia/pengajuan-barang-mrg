import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { REGISTER_ENDPOINT } from '../constants/apiEndpoints';
import '../styles/auth.css'; 
import { Link } from 'react-router-dom'; 
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  HEADER_TEXT_COLOR,
  PARAGRAPH_TEXT_COLOR,
  DANGER_TEXT_COLOR,
  SUCCESS_TEXT_COLOR,
} from '../constants/colors';
import { FONTS } from '../constants/fonts'; 

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const response = await axios.post(REGISTER_ENDPOINT, { name, email, password, password_confirmation: confirmPassword });
      const { token } = response.data;
  
      localStorage.setItem('jwtToken', token);
  
      toast.success('Registration successful!', {
        position: "top-center"
      });
      
    } catch (err) {
      setError(err.response.data.message);
  
      toast.error(`Registration failed! Reason: ${err.response.data.message}`, {
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
      <form className="authForm" onSubmit={handleRegister}> 
        <h2 className="text-center" style={{ color: HEADER_TEXT_COLOR, fontFamily: FONTS.heading }}>Register</h2>
        <p style={{ color: PARAGRAPH_TEXT_COLOR, textAlign: 'center' }}>
          Selamat datang di aplikasi 
          <span style={{ color: PRIMARY_COLOR }}> Pengajuan Barang</span>, 
          silahkan daftar terlebih dahulu.
        </p>  
        {error && <div className="alert alert-danger" style={{ color: DANGER_TEXT_COLOR }}>{error}</div>}
        <div className="form-group">
          <label style={{ color: PARAGRAPH_TEXT_COLOR }}>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ backgroundColor: SECONDARY_COLOR }}
          />
        </div>
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
          <label style={{ color: PARAGRAPH_TEXT_COLOR }}>Password</label>
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
          <label style={{ color: PARAGRAPH_TEXT_COLOR }}>Confirm Password</label>
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
          <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: SUCCESS_TEXT_COLOR }}>Register</button>
        </div>
        <div className="form-group">
          <p style={{ color: PARAGRAPH_TEXT_COLOR, textAlign: 'center' }}>
            Already have an account? <Link to="/login" style={{ color: PRIMARY_COLOR }}>Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;