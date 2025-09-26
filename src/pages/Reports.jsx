import React from 'react';

const Reports = () => {
  return (
    <div className="main-content">
      <div className="card-header">
        <h1 className="card-title">Relatórios</h1>
        <p>Gere relatórios de alunos, professores e turmas.</p>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 10 }}>Relatórios Rápidos</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <button className="btn btn-primary">Exportar Alunos (CSV)</button>
          <button className="btn btn-primary">Exportar Professores (CSV)</button>
          <button className="btn btn-primary">Exportar Turmas (CSV)</button>
          <button className="btn btn-secondary">Resumo Mensal (PDF)</button>
        </div>
        <p style={{ marginTop: 16, color: '#666' }}>Em breve: filtros avançados e gráficos interativos.</p>
      </div>
    </div>
  );
};

export default Reports;
