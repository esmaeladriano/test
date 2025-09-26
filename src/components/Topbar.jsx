import React from 'react';
import { Menu, Search, Sun, Moon } from 'lucide-react';

const Topbar = () => {
  const [query, setQuery] = React.useState('');
  const [theme, setTheme] = React.useState(() => {
    const saved = localStorage.getItem('sg_theme');
    return saved || 'dark';
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem('sg_theme', theme);
  }, [theme]);

  // Mantém o estado consistente quando a viewport muda
  React.useEffect(() => {
    const onResize = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        // No mobile não usamos 'sidebar-collapsed'
        document.body.classList.remove('sidebar-collapsed');
      } else {
        // No desktop a sidebar não fica "aberta" como drawer
        document.body.classList.remove('sidebar-open');
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggleSidebar = () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      const open = document.body.classList.toggle('sidebar-open');
      if (open) {
        // Garantir que os rótulos apareçam no mobile
        document.body.classList.remove('sidebar-collapsed');
      }
    } else {
      document.body.classList.toggle('sidebar-collapsed');
    }
  };

  const toggleTheme = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Futuramente: navegar para uma página de busca global
    if (query.trim()) {
      // Placeholder de ação: apenas log
      console.log('Buscar por:', query);
    }
  };

  return (
    <div className="topbar">
      <button className="icon-btn" title="Menu" onClick={toggleSidebar}>
        <Menu size={20} />
      </button>

      <form className="search" onSubmit={onSubmit}>
        <Search size={18} />
        <input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div className="actions">
        <button className="icon-btn" title="Alternar tema" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <img
          className="avatar"
          src="https://i.pravatar.cc/150?img=12"
          alt="Avatar"
        />
      </div>
    </div>
  );
};

export default Topbar;
