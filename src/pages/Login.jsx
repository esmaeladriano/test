import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Mail, Lock, LogIn, GraduationCap } from 'lucide-react';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = React.useState('admin@escola.com');
  const [password, setPassword] = React.useState('admin');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  const [role, setRole] = React.useState('admin'); // 'admin' | 'aluno'

  // Não redirecionar automaticamente quando já autenticado, para permitir acessar /login vindo do site público

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password, role);
      // Lembrar-me pode ser usado futuramente para persistência estendida
      if (remember) {
        localStorage.setItem('sg_remember', 'true');
      } else {
        localStorage.removeItem('sg_remember');
      }
      // Direciona conforme o perfil
      if (role === 'aluno') {
        navigate('/student', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Falha ao entrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth-card auth-card-center">
        <div className="auth-icon">
          <GraduationCap size={40} />
        </div>
        <h2 className="auth-title">Bem-vindo(a) de volta!</h2>
        <p className="auth-subtitle">Acesse sua conta para continuar</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={onSubmit} className="auth-form">
          <label className="auth-label">Perfil</label>
          <div className="auth-input" style={{ gap: 16 }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0f172a' }}>
              <input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} />
              Admin
            </label>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0f172a' }}>
              <input type="radio" name="role" value="aluno" checked={role === 'aluno'} onChange={() => setRole('aluno')} />
              Aluno
            </label>
          </div>
          <label className="auth-label">E-mail</label>
          <div className="auth-input">
            <Mail size={18} />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label className="auth-label">Senha</label>
          <div className="auth-input">
            <Lock size={18} />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="auth-actions">
            <label className="auth-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Lembrar-me
            </label>
            <Link to="#" className="auth-forgot">Esqueceu sua senha?</Link>
          </div>

          <button className="btn btn-primary auth-submit" disabled={loading}>
            <LogIn size={18} /> {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
