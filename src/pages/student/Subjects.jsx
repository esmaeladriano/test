import React from 'react';

const subjects = [
  { code: 'MAT101', name: 'Matemática', teacher: 'Prof. Júlio' },
  { code: 'POR102', name: 'Português', teacher: 'Profª. Lívia' },
  { code: 'FIS103', name: 'Física', teacher: 'Prof. Ricardo' },
  { code: 'QUI104', name: 'Química', teacher: 'Profª. Helena' },
];

const Subjects = () => {
  return (
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
          {subjects.map((s) => (
            <tr key={s.code}>
              <td>{s.code}</td>
              <td>{s.name}</td>
              <td>{s.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subjects;
