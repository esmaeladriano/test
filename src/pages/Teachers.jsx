import React, { useMemo, useState } from 'react';
import { useSchool } from '../contexts/SchoolContext';
import Modal from '../components/Modal';

const emptyTeacher = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  classes: '',
  hireDate: ''
};

const Teachers = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useSchool();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(emptyTeacher);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return teachers.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.email.toLowerCase().includes(q) ||
      t.subject.toLowerCase().includes(q)
    );
  }, [teachers, search]);

  const openNew = () => {
    setFormData(emptyTeacher);
    setEditingId(null);
    setIsOpen(true);
  };

  const openEdit = (teacher) => {
    setFormData({ ...teacher, classes: Array.isArray(teacher.classes) ? teacher.classes.join(', ') : teacher.classes });
    setEditingId(teacher.id);
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      classes: formData.classes
        ? formData.classes.split(',').map(s => s.trim()).filter(Boolean)
        : []
    };

    if (editingId) {
      updateTeacher(payload);
    } else {
      addTeacher(payload);
    }
    setIsOpen(false);
  };

  return (
    <div className="main-content">
      <div className="card-header">
        <h1 className="card-title">Professores</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            className="form-input"
            placeholder="Pesquisar professores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={openNew}>+ Novo Professor</button>
        </div>
      </div>

      <div className="card">
        {filtered.length ? (
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Disciplina</th>
                <th>Turmas</th>
                <th>Admissão</th>
                <th style={{ width: 160 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(teacher => (
                <tr key={teacher.id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone}</td>
                  <td>{teacher.subject}</td>
                  <td>{Array.isArray(teacher.classes) ? teacher.classes.join(', ') : teacher.classes}</td>
                  <td>{teacher.hireDate}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-secondary" onClick={() => openEdit(teacher)}>Editar</button>
                      <button className="btn btn-danger" onClick={() => deleteTeacher(teacher.id)}>Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum professor encontrado.</p>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editingId ? 'Editar Professor' : 'Novo Professor'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nome</label>
            <input className="form-input" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Telefone</label>
            <input className="form-input" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Disciplina</label>
            <input className="form-input" name="subject" value={formData.subject} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Turmas (separe por vírgula)</label>
            <input className="form-input" name="classes" value={formData.classes} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Data de Admissão</label>
            <input type="date" className="form-input" name="hireDate" value={formData.hireDate} onChange={handleChange} />
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

export default Teachers;
