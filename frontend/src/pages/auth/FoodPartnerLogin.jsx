import React, { useState } from 'react';
import '../../styles/auth-shared.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const email = e.target.email.value.trim();
      const password = e.target.password.value;

      const result = await login(email, password, true);

      if (result.success) {
        if (window.toast) {
          window.toast.success('Welcome back!');
        }
        navigate("/create-food");
      } else {
        if (window.toast) {
          window.toast.error(result.error || "Login failed. Please check your credentials.");
        }
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      if (window.toast) {
        window.toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="partner-login-title">
        <header>
          <h1 id="partner-login-title" className="auth-title">Partner login</h1>
          <p className="auth-subtitle">Access your dashboard and manage orders.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="business@example.com" autoComplete="email" />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Password" autoComplete="current-password" />
          </div>
          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="auth-alt-action">
          New partner? <a href="/food-partner/register">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;