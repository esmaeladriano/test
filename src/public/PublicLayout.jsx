import React from 'react';
import { Link, Outlet, NavLink } from 'react-router-dom';

const PublicLayout = () => {
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);
  return (
    <div className="public-app">
      <header className="public-nav">
        <div className="public-container nav-inner">
          <Link to="/site" className="brand-link" onClick={close}>Faculdade V&V</Link>
          <button className={`public-menu-btn ${open ? 'open' : ''}`} onClick={toggle} aria-label="Abrir menu" aria-expanded={open}>
            <span />
            <span />
            <span />
          </button>
          <nav className={`nav-links ${open ? 'open' : ''}`}>
            <NavLink onClick={close} to="/site" end className={({ isActive }) => isActive ? 'active' : ''}>Início</NavLink>
            <NavLink onClick={close} to="/site/cursos" className={({ isActive }) => isActive ? 'active' : ''}>Cursos</NavLink>
            <NavLink onClick={close} to="/site/noticias" className={({ isActive }) => isActive ? 'active' : ''}>Notícias</NavLink>
            <NavLink onClick={close} to="/site/contato" className={({ isActive }) => isActive ? 'active' : ''}>Contato</NavLink>
          </nav>
          <Link to="/login" className="btn btn-primary" onClick={close}>Entrar</Link>
        </div>
      </header>

      <main className="public-container" style={{ padding: '20px 0' }}>
        <Outlet />
      </main>

      <footer className="public-footer">
        <div className="public-container">
          © {new Date().getFullYear()} Faculdade V&V • <Link to="/login">Acesso ao Sistema</Link>
        </div>
      </footer>

      {/* Overlay para menu mobile */}
      <div className={`public-overlay ${open ? 'show' : ''}`} onClick={close} aria-hidden />
    </div>
  );
};

export default PublicLayout;
