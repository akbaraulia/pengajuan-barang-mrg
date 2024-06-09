import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LOGIN_ENDPOINT } from '../constants/apiEndpoints';
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
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.fromResetPassword) {
      toast.success('Password berhasil diubah silahkan login', {
        position: "top-center"
      });
    }
  
    if (location.state?.fromAdmin) {
      toast.info('Kamu belum login, silahkan login terlebih dahulu', {
        position: "top-center"
      });
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_ENDPOINT, { email, password });
      const { token, user } = response.data;

      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Login successful!', {
        position: "top-center"
      });

      navigate('/admin');
    } catch (err) {
      setError(err.response.data.message);

      toast.error(`Login failed! Reason: ${err.response.data.message}`, {
        position: "top-center"
      });
    }
  };

  return (
    <div className="auth-page"> 
      <ToastContainer />
      <div className="logo-container">
      <img src="https://merryriana.com/assets/images/mrg.png" alt="Logo" style={{ width: '250px', height: '100px' }} />
    </div>
      <form className="authForm" onSubmit={handleLogin}> 
        <h2 className="text-center" style={{ color: HEADER_TEXT_COLOR, fontFamily: FONTS.heading }}>Login</h2>
        <p style={{ color: PARAGRAPH_TEXT_COLOR, textAlign: 'center' }}>
          Selamat datang di aplikasi 
          <span style={{ color: PRIMARY_COLOR }}> Pengajuan Barang</span>, 
          silahkan login terlebih dahulu.
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
          <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: SUCCESS_TEXT_COLOR }}>Log in</button>
        </div>
        <p style={{ color: PARAGRAPH_TEXT_COLOR, textAlign: 'center' }}>
          Belum punya akun ? <Link to="/register" style={{ color: PRIMARY_COLOR }}>Daftar</Link>
        </p>
        <p style={{ color: PARAGRAPH_TEXT_COLOR, textAlign: 'center' }}>
          Lupa password? <Link to="/forgot" style={{ color: PRIMARY_COLOR }}>Reset Password</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;