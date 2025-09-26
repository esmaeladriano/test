import React from 'react';
import { useSchool } from '../contexts/SchoolContext';
import { Users, UserCheck, BookOpen, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { students, teachers, classes } = useSchool();

  const stats = [
    {
      icon: Users,
      label: 'Total de Alunos',
      value: students.length,
      color: '#667eea'
    },
    {
      icon: UserCheck,
      label: 'Professores',
      value: teachers.length,
      color: '#f093fb'
    },
    {
      icon: BookOpen,
      label: 'Turmas Ativas',
      value: classes.length,
      color: '#4facfe'
    },
    {
      icon: TrendingUp,
      label: 'Taxa de Aprovação',
      value: '94%',
      color: '#43e97b'
    }
  ];

  const recentStudents = students.slice(-5);
  const upcomingEvents = [
    { id: 1, title: 'Reunião de Pais', date: '2024-01-15', time: '19:00' },
    { id: 2, title: 'Prova de Matemática', date: '2024-01-18', time: '08:00' },
    { id: 3, title: 'Feira de Ciências', date: '2024-01-22', time: '14:00' },
    { id: 4, title: 'Conselho de Classe', date: '2024-01-25', time: '16:00' }
  ];

  return (
    <div className="main-content">
      <div className="card-header">
        <h1 className="card-title">Dashboard</h1>
        <p>Bem-vindo ao Sistema de Gestão Escolar</p>
      </div>

      {/* Estatísticas */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div style={{ color: stat.color, marginBottom: '15px' }}>
                <Icon size={40} />
              </div>
              <div className="stat-number" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Alunos Recentes */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Alunos Recentes</h2>
          </div>
          <div>
            {recentStudents.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Turma</th>
                    <th>Série</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map(student => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.class}</td>
                      <td>{student.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nenhum aluno cadastrado</p>
            )}
          </div>
        </div>

        {/* Próximos Eventos */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Próximos Eventos</h2>
          </div>
          <div>
            {upcomingEvents.map(event => (
              <div key={event.id} style={{ 
                padding: '15px', 
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>
                    {event.title}
                  </h4>
                  <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                    {event.date} às {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resumo das Turmas */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Resumo das Turmas</h2>
        </div>
        <div>
          {classes.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Turma</th>
                  <th>Série</th>
                  <th>Professor</th>
                  <th>Alunos</th>
                  <th>Horário</th>
                  <th>Sala</th>
                </tr>
              </thead>
              <tbody>
                {classes.map(cls => (
                  <tr key={cls.id}>
                    <td>{cls.name}</td>
                    <td>{cls.grade}</td>
                    <td>{cls.teacher}</td>
                    <td>{cls.students}</td>
                    <td>{cls.schedule}</td>
                    <td>{cls.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nenhuma turma cadastrada</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
