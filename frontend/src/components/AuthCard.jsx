import React from 'react';

export default function AuthCard({brand='PLATR 🍽️', tagline='Decide what to eat faster.', title, role, children, secondary}){
  return (
    <div>
      <header className="auth-header">
        <div className="brand">{brand}</div>
        <div className="tagline">{tagline}</div>
        <h2 className="page-title">{title}</h2>
        <div className="role-text">{role}</div>
      </header>

      <div className="card-body">
        {children}
      </div>

      {secondary ? <div className="secondary card-secondary">{secondary}</div> : null}
    </div>
  );
}
