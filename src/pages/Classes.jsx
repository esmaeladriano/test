import React, { useMemo, useState } from 'react';
import { useSchool } from '../contexts/SchoolContext';
import Modal from '../components/Modal';

const emptyClass = {
  name: '',
  grade: '',
  teacher: '',
  students: 0,
  schedule: '',
  room: ''
};

const Classes = () => {
  const { classes, addClass, updateClass, deleteClass } = useSchool();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(emptyClass);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return classes.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.grade.toLowerCase().includes(q) ||
      c.teacher.toLowerCase().includes(q) ||
      c.schedule.toLowerCase().includes(q) ||
      c.room.toLowerCase().includes(q)
    );
  }, [classes, search]);

  const openNew = () => {
    setFormData(emptyClass);
    setEditingId(null);
    setIsOpen(true);
  };

  const openEdit = (cls) => {
    setFormData(cls);
    setEditingId(cls.id);
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'students' ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateClass(formData);
    } else {
      addClass(formData);
    }
    setIsOpen(false);
  };

  return (
    <div className="main-content">
      <div className="card-header">
        <h1 className="card-title">Turmas</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            className="form-input"
            placeholder="Pesquisar turmas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={openNew}>+ Nova Turma</button>
        </div>
      </div>

      <div className="card">
        {filtered.length ? (
          <table className="table">
            <thead>
              <tr>
                <th>Turma</th>
                <th>Série</th>
                <th>Professor</th>
                <th>Alunos</th>
                <th>Horário</th>
                <th>Sala</th>
                <th style={{ width: 160 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(cls => (
                <tr key={cls.id}>
                  <td>{cls.name}</td>
                  <td>{cls.grade}</td>
                  <td>{cls.teacher}</td>
                  <td>{cls.students}</td>
                  <td>{cls.schedule}</td>
                  <td>{cls.room}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-secondary" onClick={() => openEdit(cls)}>Editar</button>
                      <button className="btn btn-danger" onClick={() => deleteClass(cls.id)}>Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma turma encontrada.</p>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editingId ? 'Editar Turma' : 'Nova Turma'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nome da Turma</label>
            <input className="form-input" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Série</label>
            <input className="form-input" name="grade" value={formData.grade} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Professor</label>
            <input className="form-input" name="teacher" value={formData.teacher} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Quantidade de Alunos</label>
            <input type="number" min="0" className="form-input" name="students" value={formData.students} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Horário</label>
            <input className="form-input" name="schedule" value={formData.schedule} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Sala</label>
            <input className="form-input" name="room" value={formData.room} onChange={handleChange} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button type="button" className="btn" onClick={() => setIsOpen(false)}>Cancelar</button>
            <button className="btn btn-primary" type="submit">Salvar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Classes;
