import React from 'react';
import { useSchool } from '../contexts/SchoolContext';
import { Users, UserCheck, BookOpen, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { students, teachers } = useSchool();

  const kpis = [
    { icon: UserCheck, label: 'Professor(es)', value: teachers.length, className: 'kpi kpi-dark' },
    { icon: Users, label: 'Alunos', value: students.length, className: 'kpi kpi-blue' },
    { icon: TrendingUp, label: 'Admins', value: 3, className: 'kpi kpi-orange' },
    { icon: BookOpen, label: 'Notícias', value: 6, className: 'kpi kpi-blue' }
  ];

  const slides = [
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1470&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=1470&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=1470&auto=format&fit=crop'
  ];

  const [active, setActive] = React.useState(0);

  return (
    <div className="main-content">
      <div className="card" style={{ paddingBottom: 10 }}>
        <h1 className="card-title">Dashboard Admin</h1>
      </div>

      {/* KPIs */}
      <div className="stats-grid">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className={`stat-card ${k.className}`}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon size={28} />
                  <div className="stat-label">{k.label}</div>
                </div>
                <div className="stat-number">{k.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chamados e Destaques */}
      <div className="two-col">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Chamados</h2>
          </div>
          <div className="banner">Você não possui chamados em aberto ainda</div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Destaques</h2>
          </div>
          <div className="carousel">
            <img src={slides[active]} alt={`Slide ${active + 1}`} />
            <div className="carousel-dots">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  className={`carousel-dot ${idx === active ? 'active' : ''}`}
                  onClick={() => setActive(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Por dentro da escola */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Por dentro da escola</h2>
        </div>
        <div className="showcase-grid">
          {[1,2,3,4].map((n) => (
            <div key={n} className="showcase-card">
              <img src={`https://picsum.photos/seed/school-${n}/600/400`} alt={`Card ${n}`} />
              <div className="content">
                <strong>Atividade {n}</strong>
                <p style={{ marginTop: 6, color: '#a9b3c4' }}>Destaques da nossa escola e eventos recentes.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
