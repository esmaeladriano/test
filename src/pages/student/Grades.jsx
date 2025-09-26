import React from 'react';

const data = [
  { subject: 'Matemática', term: '1º Bimestre', grade: 17 },
  { subject: 'Português', term: '1º Bimestre', grade: 15 },
  { subject: 'Física', term: '1º Bimestre', grade: 14 },
  { subject: 'Química', term: '1º Bimestre', grade: 16 },
];

const Grades = () => {
  return (
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
          {data.map((g, i) => (
            <tr key={i}>
              <td>{g.subject}</td>
              <td>{g.term}</td>
              <td>{g.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grades;
