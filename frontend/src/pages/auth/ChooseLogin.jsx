import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth-shared.css';
import { useAuth } from '../../context/AuthContext';

const ChooseLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('user'); // 'user' or 'foodPartner'
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const email = e.target.email.value.trim();
      const password = e.target.password.value;

      if (!email || !password) {
        setError('Email and password are required');
        setLoading(false);
        return;
      }

      const isFoodPartner = userType === 'foodPartner';
      const result = await login(email, password, isFoodPartner);

      if (result.success) {
        if (window.toast) {
          window.toast.success('Welcome back!');
        }
        if (isFoodPartner) {
          navigate("/create-food");
        } else {
          navigate("/home");
        }
      } else {
        const errorMessage = result.error || "Login failed. Please check your credentials.";
        setError(errorMessage);
        if (window.toast) {
          window.toast.error(errorMessage);
        }
      }
    } catch (err) {
      const errorMessage = "Login failed. Please try again.";
      setError(errorMessage);
      if (window.toast) {
        window.toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="login-title">
        <header>
          <h1 id="login-title" className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue your food journey.</p>
        </header>

        {/* User Type Selection */}
        <div className="user-type-toggle">
          <button
            type="button"
            onClick={() => setUserType('user')}
            className={userType === 'user' ? 'active' : ''}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setUserType('foodPartner')}
            className={userType === 'foodPartner' ? 'active' : ''}
          >
            Food Partner
          </button>
        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">EMAIL</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder={userType === 'foodPartner' ? 'business@example.com' : 'you@example.com'} 
              autoComplete="email" 
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="password">PASSWORD</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              autoComplete="current-password" 
              required
            />
          </div>
          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="auth-alt-action">
          New here? <Link to="/register">Create account</Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseLogin;
