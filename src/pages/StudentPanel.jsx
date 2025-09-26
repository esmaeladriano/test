import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Bell, BookOpen, Calendar, CheckCircle2, GraduationCap, ListChecks, Users } from 'lucide-react';

const tabs = [
  { key: 'grades', label: 'Notas', icon: GraduationCap },
  { key: 'classmates', label: 'Colegas', icon: Users },
  { key: 'subjects', label: 'Matérias', icon: BookOpen },
  { key: 'schedule', label: 'Horário', icon: Calendar },
  { key: 'attendance', label: 'Frequência', icon: CheckCircle2 },
  { key: 'notifications', label: 'Notificações', icon: Bell },
];

const mock = {
  grades: [
    { subject: 'Matemática', term: '1º Bimestre', grade: 17 },
    { subject: 'Português', term: '1º Bimestre', grade: 15 },
    { subject: 'Física', term: '1º Bimestre', grade: 14 },
    { subject: 'Química', term: '1º Bimestre', grade: 16 },
  ],
  classmates: [
    { id: 1, name: 'Ana Souza' },
    { id: 2, name: 'Bruno Lima' },
    { id: 3, name: 'Carla Mendes' },
    { id: 4, name: 'Diego Alves' },
  ],
  subjects: [
    { code: 'MAT101', name: 'Matemática', teacher: 'Prof. Júlio' },
    { code: 'POR102', name: 'Português', teacher: 'Profª. Lívia' },
    { code: 'FIS103', name: 'Física', teacher: 'Prof. Ricardo' },
    { code: 'QUI104', name: 'Química', teacher: 'Profª. Helena' },
  ],
  schedule: [
    { day: 'Seg', items: ['08:00 Matemática', '10:00 Português', '14:00 Física'] },
    { day: 'Ter', items: ['08:00 Química', '10:00 Matemática', '14:00 Educação Física'] },
    { day: 'Qua', items: ['08:00 Português', '10:00 Física'] },
    { day: 'Qui', items: ['08:00 Matemática', '10:00 Química'] },
    { day: 'Sex', items: ['09:00 Projeto'] },
  ],
  attendance: [
    { month: 'Mar', presence: 92 },
    { month: 'Abr', presence: 95 },
    { month: 'Mai', presence: 89 },
  ],
  notifications: {
    personal: [
      { id: 11, title: 'Entrega de Trabalho', text: 'Lembrete: trabalho de Física até sexta.' },
    ],
    global: [
      { id: 21, title: 'Feriado', text: 'Não haverá aula na próxima segunda-feira.' },
      { id: 22, title: 'Semana da Ciência', text: 'Programação disponível no mural.' },
    ],
  },
};

const StudentPanel = () => {
  const { section = 'grades' } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = React.useState(section);

  React.useEffect(() => {
    setActive(section || 'grades');
  }, [section]);

  return (
    <div className="main-content">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Área do Aluno</h2>
        </div>

        <div className="tabs">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`tab ${active === key ? 'active' : ''}`}
              onClick={() => { setActive(key); navigate(`/student/${key}`, { replace: false }); }}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {active === 'grades' && (
          <div className="card" style={{ marginTop: 12 }}>
            <h3 className="card-title">Minhas Notas</h3>
            <table className="table" style={{ marginTop: 10 }}>
              <thead>
                <tr>
                  <th>Disciplina</th>
                  <th>Período</th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>
                {mock.grades.map((g, i) => (
                  <tr key={i}>
                    <td>{g.subject}</td>
                    <td>{g.term}</td>
                    <td>{g.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === 'classmates' && (
          <div className="card" style={{ marginTop: 12 }}>
            <h3 className="card-title">Colegas da Turma</h3>
            <ul>
              {mock.classmates.map((c) => (
                <li key={c.id} style={{ padding: '8px 4px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{c.name}</li>
              ))}
            </ul>
          </div>
        )}

        {active === 'subjects' && (
          <div className="card" style={{ marginTop: 12 }}>
            <h3 className="card-title">Minhas Disciplinas</h3>
            <table className="table" style={{ marginTop: 10 }}>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Disciplina</th>
                  <th>Professor(a)</th>
                </tr>
              </thead>
              <tbody>
                {mock.subjects.map((s) => (
                  <tr key={s.code}>
                    <td>{s.code}</td>
                    <td>{s.name}</td>
                    <td>{s.teacher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === 'schedule' && (
          <div className="card" style={{ marginTop: 12 }}>
            <h3 className="card-title">Horário Escolar</h3>
            <div className="two-col" style={{ marginTop: 10 }}>
              {mock.schedule.map((d) => (
                <div key={d.day} className="banner">
                  <strong style={{ display: 'block', marginBottom: 6 }}>{d.day}</strong>
                  <ul>
                    {d.items.map((it, i) => (
                      <li key={i} style={{ padding: '4px 0' }}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === 'attendance' && (
          <div className="card" style={{ marginTop: 12 }}>
            <h3 className="card-title">Frequência</h3>
            <div className="stats-grid" style={{ marginTop: 10 }}>
              {mock.attendance.map((m) => (
                <div key={m.month} className="stat-card kpi kpi-dark">
                  <div className="stat-number">{m.presence}%</div>
                  <div className="stat-label">{m.month}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === 'notifications' && (
          <div className="card" style={{ marginTop: 12 }}>
            <h3 className="card-title">Notificações</h3>
            <div className="two-col" style={{ marginTop: 10 }}>
              <div className="card">
                <h4 className="card-title">Individuais</h4>
                <ul>
                  {mock.notifications.personal.map((n) => (
                    <li key={n.id} style={{ padding: '8px 4px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <strong>{n.title}</strong>
                      <div style={{ color: 'var(--text-secondary)' }}>{n.text}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <h4 className="card-title">Coletivas</h4>
                <ul>
                  {mock.notifications.global.map((n) => (
                    <li key={n.id} style={{ padding: '8px 4px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <strong>{n.title}</strong>
                      <div style={{ color: 'var(--text-secondary)' }}>{n.text}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPanel;
