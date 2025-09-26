import React from 'react';
import { Bell, Info, CheckCircle2 } from 'lucide-react';

const notifications = {
  personal: [
    { id: 11, title: 'Entrega de Trabalho', text: 'Lembrete: trabalho de Física até sexta.', time: 'há 2h', unread: true },
    { id: 12, title: 'Reposição de Aula', text: 'Português remarcado para quarta 10h.', time: 'ontem', unread: false },
  ],
  global: [
    { id: 21, title: 'Feriado', text: 'Não haverá aula na próxima segunda-feira.', time: 'há 3 dias', unread: false },
    { id: 22, title: 'Semana da Ciência', text: 'Programação disponível no mural.', time: 'há 5 dias', unread: true },
  ],
};

const List = ({ title, items, accent = 'blue' }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">{title}</h4>
        <span className={`badge badge-${accent}`}>{items.length}</span>
      </div>
      <ul className="notif-list">
        {items.map((n) => (
          <li key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
            <div className="notif-icon">
              {n.unread ? <Bell size={16} /> : <CheckCircle2 size={16} />}
            </div>
            <div className="notif-content">
              <div className="notif-title">{n.title}</div>
              <div className="notif-text">{n.text}</div>
            </div>
            <div className="notif-meta">{n.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Notifications = () => {
  const [showUnreadOnly, setShowUnreadOnly] = React.useState(false);
  const [data, setData] = React.useState(notifications);

  const markAllAsRead = () => {
    setData((d) => ({
      personal: d.personal.map((n) => ({ ...n, unread: false })),
      global: d.global.map((n) => ({ ...n, unread: false })),
    }));
  };

  const filtered = {
    personal: showUnreadOnly ? data.personal.filter((n) => n.unread) : data.personal,
    global: showUnreadOnly ? data.global.filter((n) => n.unread) : data.global,
  };

  return (
    <div>
      <div className="card" style={{ marginTop: 12 }}>
        <div className="card-header">
          <h3 className="card-title">Notificações</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <label className="tab" style={{ cursor: 'pointer' }}>
              <input type="checkbox" checked={showUnreadOnly} onChange={(e) => setShowUnreadOnly(e.target.checked)} />
              Mostrar não lidas
            </label>
            <button className="btn btn-secondary" onClick={markAllAsRead}>Marcar tudo como lido</button>
          </div>
        </div>
      </div>

      <div className="two-col" style={{ marginTop: 12 }}>
        <List title="Individuais" items={filtered.personal} accent="indigo" />
        <List title="Coletivas" items={filtered.global} accent="sky" />
      </div>
    </div>
  );
};

export default Notifications;
