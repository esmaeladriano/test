import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <section className="hero">
        <h1>Bem-vindo à Faculdade V&V</h1>
        <p>Educação de qualidade com tecnologia e inovação.</p>
        <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link className="btn btn-primary" to="/login">Entrar no Sistema</Link>
          <Link className="btn btn-secondary" to="/site/cursos">Ver Cursos</Link>
        </div>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>Serviços do Sistema de Gestão</h2>
        <div className="feature-grid" style={{ marginTop: 10 }}>
          <div className="feature">
            <h3>Gestão Acadêmica</h3>
            <p>Matrícula, histórico, horários, notas e frequência.</p>
          </div>
          <div className="feature">
            <h3>Financeiro</h3>
            <p>Mensalidades, comprovantes, segunda via e boletos.</p>
          </div>
          <div className="feature">
            <h3>Biblioteca</h3>
            <p>Empréstimos, renovação, catálogo e reservas de títulos.</p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>Comunicados Recentes</h2>
        <div className="showcase-grid" style={{ marginTop: 10 }}>
          {[1,2,3].map((n) => (
            <div key={n} className="showcase-card">
              <img src={`https://picsum.photos/seed/comunicado-${n}/400/140`} alt="comunicado" />
              <div className="content">
                <div style={{ fontSize: '.85rem', color: 'var(--text-secondary)' }}>2025-10-0{n}</div>
                <div style={{ fontWeight: 700 }}>Aviso importante #{n}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner" style={{ marginTop: 16 }}>
        <div>
          <h3>Pronto para começar?</h3>
          <p>Faça login para acessar o painel ou conheça nossos cursos.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link className="btn btn-primary" to="/login">Entrar</Link>
          <Link className="btn btn-secondary" to="/site/cursos">Cursos</Link>
        </div>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>Acesso Rápido</h2>
        <div className="quick-grid" style={{ marginTop: 10 }}>
          <Link className="quick-card" to="/login">
            <div className="title">Portal do Aluno</div>
            <div className="desc">Notas, presença, horários e notificações</div>
          </Link>
          <Link className="quick-card" to="/login">
            <div className="title">Portal do Professor</div>
            <div className="desc">Lançamento de notas, frequência e turmas</div>
          </Link>
          <Link className="quick-card" to="/login">
            <div className="title">Secretaria</div>
            <div className="desc">Declarações, documentos e atendimento</div>
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>Atendimento e Calendário</h2>
        <div className="two-col" style={{ marginTop: 10 }}>
          <div className="card">
            <h4 className="card-title">Horário de Atendimento</h4>
            <ul>
              <li>Seg a Sex: 08:00 às 18:00</li>
              <li>Sáb: 08:00 às 12:00</li>
              <li>Contato: (11) 99999-0000 • atendimento@vv.edu</li>
            </ul>
          </div>
          <div className="card">
            <h4 className="card-title">Próximas Datas</h4>
            <ul>
              <li>10/10 — Início do semestre</li>
              <li>20/11 — Semana de Provas</li>
              <li>15/12 — Encerramento</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 16, marginBottom: 12 }}>
        <h2>Perguntas Frequentes</h2>
        <div className="faq">
          <details>
            <summary>Como acesso minhas notas?</summary>
            <p>Faça login no sistema e acesse o menu do aluno em Notas.</p>
          </details>
          <details>
            <summary>Como emitir a segunda via do boleto?</summary>
            <p>No módulo Financeiro, após o login, você pode emitir a 2ª via.</p>
          </details>
          <details>
            <summary>Como obter uma declaração de matrícula?</summary>
            <p>Solicite pela Secretaria dentro do sistema após o login.</p>
          </details>
        </div>
      </section>
    </div>
  );
};

export default Home;
