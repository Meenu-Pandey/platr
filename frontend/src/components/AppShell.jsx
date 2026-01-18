import React from 'react';
import './AppShell.css';

const AppShell = ({ children }) => {
  return (
    <div className="app-shell-wrapper">
      <div className="app-shell">
        {children}
      </div>
    </div>
  );
};

export default AppShell;

