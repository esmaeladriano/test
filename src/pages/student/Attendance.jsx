import React from 'react';

// Mock: carga horária mensal com dias totais e dias presentes
const attendance = [
  { month: 'Mar', total: 22, present: 20 },
  { month: 'Abr', total: 20, present: 19 },
  { month: 'Mai', total: 21, present: 18 },
];

const Attendance = () => {
  const totals = attendance.reduce(
    (acc, m) => {
      acc.total += m.total;
      acc.present += m.present;
      return acc;
    },
    { total: 0, present: 0 }
  );
  const absences = totals.total - totals.present;
  const pctPresent = totals.total ? Math.round((totals.present / totals.total) * 100) : 0;
  const pctAbsent = 100 - pctPresent;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <h3 className="card-title">Frequência</h3>
      {/* Resumo */}
      <div className="stats-grid" style={{ marginTop: 10 }}>
        <div className="stat-card kpi kpi-dark">
          <div className="stat-number">{totals.present}</div>
          <div className="stat-label">Dias presentes</div>
        </div>
        <div className="stat-card kpi kpi-dark">
          <div className="stat-number">{absences}</div>
          <div className="stat-label">Dias de falta</div>
        </div>
        <div className="stat-card kpi kpi-blue">
          <div className="stat-number">{pctPresent}%</div>
          <div className="stat-label">% de presença</div>
        </div>
        <div className="stat-card kpi kpi-orange">
          <div className="stat-number">{pctAbsent}%</div>
          <div className="stat-label">% de faltas</div>
        </div>
      </div>

      {/* Gráfico simples por mês */}
      <div className="card" style={{ marginTop: 12 }}>
        <h4 className="card-title">Presença por mês</h4>
        <div className="bar-chart">
          {attendance.map((m) => {
            const pct = Math.round((m.present / m.total) * 100);
            return (
              <div key={m.month} className="bar" style={{ height: `${pct * 1.2}px` }}>
                <span className="value">{pct}%</span>
                <span className="label">{m.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabela detalhada */}
      <div className="card" style={{ marginTop: 12 }}>
        <h4 className="card-title">Detalhes</h4>
        <table className="table" style={{ marginTop: 10 }}>
          <thead>
            <tr>
              <th>Mês</th>
              <th>Dias Totais</th>
              <th>Presentes</th>
              <th>Faltas</th>
              <th>% Presença</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((m) => {
              const p = Math.round((m.present / m.total) * 100);
              return (
                <tr key={m.month}>
                  <td>{m.month}</td>
                  <td>{m.total}</td>
                  <td>{m.present}</td>
                  <td>{m.total - m.present}</td>
                  <td>{p}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
