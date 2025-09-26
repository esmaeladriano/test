import React from 'react';

const schedule = [
  { day: 'Seg', items: [
    { time: '08:00', subject: 'Matemática', color: '#60a5fa' },
    { time: '10:00', subject: 'Português', color: '#34d399' },
    { time: '14:00', subject: 'Física', color: '#f59e0b' },
  ]},
  { day: 'Ter', items: [
    { time: '08:00', subject: 'Química', color: '#f97316' },
    { time: '10:00', subject: 'Matemática', color: '#60a5fa' },
    { time: '14:00', subject: 'Ed. Física', color: '#a78bfa' },
  ]},
  { day: 'Qua', items: [
    { time: '08:00', subject: 'Português', color: '#34d399' },
    { time: '10:00', subject: 'Física', color: '#f59e0b' },
  ]},
  { day: 'Qui', items: [
    { time: '08:00', subject: 'Matemática', color: '#60a5fa' },
    { time: '10:00', subject: 'Química', color: '#f97316' },
  ]},
  { day: 'Sex', items: [
    { time: '09:00', subject: 'Projeto', color: '#22c55e' },
  ]},
];

const Schedule = () => {
  const [view, setView] = React.useState(() => (window.innerWidth <= 768 ? 'day' : 'week'));
  const [activeDay, setActiveDay] = React.useState(schedule[0].day);

  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth <= 768) setView('day');
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const legend = Array.from(new Map(
    schedule.flatMap(d => d.items.map(i => [i.subject, i.color]))
  ));

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="toolbar">
        <h3 className="card-title">Horário Escolar</h3>
        <div className="segmented">
          <button className={`seg-btn ${view === 'week' ? 'active' : ''}`} onClick={() => setView('week')}>Semana</button>
          <button className={`seg-btn ${view === 'day' ? 'active' : ''}`} onClick={() => setView('day')}>Dia</button>
        </div>
      </div>

      {/* Tabs de dias */}
      <div className="tabs" style={{ marginTop: 10 }}>
        {schedule.map(d => (
          <button key={d.day} className={`tab ${activeDay === d.day ? 'active' : ''}`} onClick={() => setActiveDay(d.day)}>
            {d.day}
          </button>
        ))}
      </div>

      {view === 'week' ? (
        <div className="schedule-grid" style={{ marginTop: 6 }}>
          {schedule.map((d) => (
            <div key={d.day} className="schedule-card">
              <h4>{d.day}</h4>
              <div>
                {d.items.map((it, i) => (
                  <span key={i} className="chip" style={{ border: `1px solid ${it.color}`, color: '#e9eef5' }}>
                    <span className="dot" style={{ background: it.color }} /> {it.time} {it.subject}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="schedule-card" style={{ marginTop: 6 }}>
          <h4>{activeDay}</h4>
          <div>
            {schedule.find(d => d.day === activeDay)?.items.map((it, i) => (
              <span key={i} className="chip" style={{ border: `1px solid ${it.color}`, color: '#e9eef5' }}>
                <span className="dot" style={{ background: it.color }} /> {it.time} {it.subject}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Legenda */}
      <div className="legend" style={{ marginTop: 12 }}>
        {legend.map(([subject, color]) => (
          <span key={subject} className="chip" style={{ border: `1px solid ${color}` }}>
            <span className="dot" style={{ background: color }} /> {subject}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
