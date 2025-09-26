import React from 'react';

const Gallery = () => {
  return (
    <div className="main-content">
      <div className="card-header">
        <h1 className="card-title">Galeria do Site</h1>
        <p>Imagens e álbuns da instituição.</p>
      </div>
      <div className="showcase-grid">
        {[1,2,3,4,5,6].map((n) => (
          <div key={n} className="showcase-card">
            <img src={`https://picsum.photos/seed/gallery-${n}/600/400`} alt={`galeria-${n}`} />
            <div className="content">
              <strong>Álbum {n}</strong>
              <p style={{ marginTop: 6, color: '#a9b3c4' }}>Descrição breve do álbum.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
