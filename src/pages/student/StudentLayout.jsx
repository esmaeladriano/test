import React from 'react';
import { Outlet } from 'react-router-dom';

const StudentLayout = () => {
  return (
    <div className="main-content">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Área do Aluno</h2>
        </div>
        {/* O conteúdo de cada seção é renderizado aqui */}
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;
