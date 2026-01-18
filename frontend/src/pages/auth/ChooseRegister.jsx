import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth-shared.css';

const ChooseRegister = () => {
  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="choose-register-title">
        <header>
          <h1 id="choose-register-title" className="auth-title">Register</h1>
          <p className="auth-subtitle">Pick how you want to join the platform.</p>
        </header>
        <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
          <Link 
            to="/user/register" 
            className="auth-submit" 
            style={{
              textDecoration:'none',
              background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)',
              color: '#fff',
              border: 'none'
            }}
          >
            Register as User
          </Link>
          <Link 
            to="/food-partner/register" 
            className="auth-submit" 
            style={{
              textDecoration:'none', 
              background:'var(--color-surface-alt)', 
              color:'var(--color-text)', 
              border:'2px solid var(--color-border)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}
          >
            Register as Food Partner
          </Link>
        </div>
        <div className="auth-alt-action" style={{marginTop:'4px'}}>
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;