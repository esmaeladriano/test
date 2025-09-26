import React from 'react';

const News = () => {
  const items = [
    { id: 1, title: 'Semana da Ciência começa na próxima segunda.', date: '2025-10-01' },
    { id: 2, title: 'Abertas as inscrições para bolsas de estudo.', date: '2025-10-10' },
  ];
  return (
    <div>
      <h2>Notícias</h2>
      <div className="showcase-grid" style={{ marginTop: 10 }}>
        {items.map((n) => (
          <div key={n.id} className="showcase-card">
            <img src={`https://picsum.photos/seed/${n.id}/400/140`} alt="notícia" />
            <div className="content">
              <div style={{ fontSize: '.85rem', color: 'var(--text-secondary)' }}>{n.date}</div>
              <div style={{ fontWeight: 700 }}>{n.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
