import React from 'react';

const classmates = [
  { id: 1, name: 'Ana Souza' },
  { id: 2, name: 'Bruno Lima' },
  { id: 3, name: 'Carla Mendes' },
  { id: 4, name: 'Diego Alves' },
];

const initials = (name) => name.split(' ').map((p) => p[0]).slice(0,2).join('').toUpperCase();

const Classmates = () => {
  return (
    <div className="card" style={{ marginTop: 12 }}>
      <h3 className="card-title">Colegas da Turma</h3>
      <div className="avatar-grid" style={{ marginTop: 10 }}>
        {classmates.map((c) => (
          <div key={c.id} className="avatar-card">
            <div className="avatar">{initials(c.name)}</div>
            <div>
              <div style={{ fontWeight: 700 }}>{c.name}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '.9rem' }}>Aluno(a)</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classmates;
