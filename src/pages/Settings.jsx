import React, { useEffect, useState } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.style.backgroundColor = theme === 'light' ? '#f5f5f5' : '#1f1f1f';
    document.body.style.color = theme === 'light' ? '#333' : '#f0f0f0';
  }, [theme]);

  return (
    <div className="main-content">
      <div className="card-header">
        <h1 className="card-title">Configurações</h1>
        <p>Ajuste preferências da aplicação.</p>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 10 }}>Tema</h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className={`btn ${theme === 'light' ? 'btn-primary' : ''}`} onClick={() => setTheme('light')}>Claro</button>
          <button className={`btn ${theme === 'dark' ? 'btn-primary' : ''}`} onClick={() => setTheme('dark')}>Escuro</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
