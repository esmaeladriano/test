import React from 'react';

const Courses = () => {
  const courses = [
    { code: 'INF-101', name: 'Informática Básica' },
    { code: 'GES-202', name: 'Gestão de Projetos' },
    { code: 'EDF-110', name: 'Educação Física' },
    { code: 'DIR-301', name: 'Direito Civil' },
  ];
  return (
    <div>
      <h2>Nossos Cursos</h2>
      <div className="subject-grid" style={{ marginTop: 10 }}>
        {courses.map((c) => (
          <div key={c.code} className="subject-card">
            <div className="code">{c.code}</div>
            <div style={{ fontWeight: 700 }}>{c.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
