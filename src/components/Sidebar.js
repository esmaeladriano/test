import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, UserCheck, BookOpen, Settings, Image, FileText, LayoutDashboard, LogOut, UserPlus, Layers, GraduationCap, Bell, Calendar, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const isAluno = user?.role === 'aluno';
  const menuItems = isAluno
    ? [
        { path: '/student/grades', icon: GraduationCap, label: 'Notas' },
        { path: '/student/classmates', icon: Users, label: 'Colegas' },
        { path: '/student/subjects', icon: BookOpen, label: 'Matérias' },
        { path: '/student/schedule', icon: Calendar, label: 'Horário' },
        { path: '/student/attendance', icon: CheckCircle2, label: 'Frequência' },
        { path: '/student/notifications', icon: Bell, label: 'Notificações' },
        { path: '/account', icon: UserCheck, label: 'Minha Conta' },
      ]
    : [
        { path: '/', icon: Home, label: 'Início' },
        { path: '/', icon: LayoutDashboard, label: 'Dashboards' },
        { path: '/student', icon: GraduationCap, label: 'Painel do Aluno' },
        { path: '/students', icon: UserPlus, label: 'Cadastrar Usuários' },
        { path: '/teachers', icon: Users, label: 'Gerenciar Usuários' },
        { path: '/classes', icon: BookOpen, label: 'Turmas' },
        { path: '/disciplines', icon: Layers, label: 'Disciplinas' },
        { path: '/news', icon: null, label: 'Notícias', custom: true },
        { path: '/settings', icon: Settings, label: 'Personalização do Site' },
        { path: '/gallery', icon: Image, label: 'Galeria do Site' },
        { path: '/documents', icon: FileText, label: 'Documentos' },
        { path: '/account', icon: UserCheck, label: 'Minha Conta' },
      ];

  return (
    <div className="sidebar">
      <h1>FACULDADE V&V</h1>

      {!isAluno && (
        <div className="sidebar-profile">
          <img src="https://i.pravatar.cc/150?img=12" alt="Perfil" />
          <div>
            <div className="profile-name">Ítalo Raniilys Benício Silva</div>
            <div className="profile-role">Administrador</div>
          </div>
        </div>
      )}

      <div style={{ height: 12 }} />
      {isAluno && (
        <div className="nav-section" style={{
          padding: '6px 8px',
          color: 'var(--text-secondary)',
          fontSize: '.8rem',
          textTransform: 'uppercase',
          letterSpacing: '.04em'
        }}>
          Área do Aluno
        </div>
      )}
      <nav>
        <ul className="nav-menu">
          {menuItems.map((item) => {
            // ícone customizado para 'Notícias' sem importar Calendar de lucide
            const Icon = item.custom
              ? (() => (props) => (
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                ))()
              : item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  title={item.label}
                >
                  <Icon size={22} />
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {location.pathname === '/news' && (
        <div className="banner">Você não possui notícias em aberto ainda</div>
      )}

      <div style={{ marginTop: 'auto', padding: '8px 4px' }}>
        <button
          type="button"
          className="nav-link"
          onClick={() => { logout(); navigate('/login', { replace: true }); }}
          style={{ width: '100%', background: 'transparent' }}
          title="Sair"
        >
          <LogOut size={22} /> <span className="nav-label">Sair</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
