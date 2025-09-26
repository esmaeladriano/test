import React, { useMemo, useState } from 'react';
import { useSchool } from '../contexts/SchoolContext';
import Modal from '../components/Modal';

const emptyStudent = {
  name: '',
  email: '',
  phone: '',
  class: '',
  grade: '',
  birthDate: '',
  address: ''
};

const Students = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useSchool();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(emptyStudent);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return students.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.class.toLowerCase().includes(q) ||
      s.grade.toLowerCase().includes(q)
    );
  }, [students, search]);

  const openNew = () => {
    setFormData(emptyStudent);
    setEditingId(null);
    setIsOpen(true);
  };

  const openEdit = (student) => {
    setFormData(student);
    setEditingId(student.id);
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateStudent(formData);
    } else {
      addStudent(formData);
    }
    setIsOpen(false);
  };

  return (
    <div className="main-content">
      <div className="card-header">
        <h1 className="card-title">Alunos</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            className="form-input"
            placeholder="Pesquisar alunos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={openNew}>+ Novo Aluno</button>
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
                <th>Turma</th>
                <th>Série</th>
                <th>Nascimento</th>
                <th>Endereço</th>
                <th style={{ width: 160 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.class}</td>
                  <td>{student.grade}</td>
                  <td>{student.birthDate}</td>
                  <td>{student.address}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-secondary" onClick={() => openEdit(student)}>Editar</button>
                      <button className="btn btn-danger" onClick={() => deleteStudent(student.id)}>Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum aluno encontrado.</p>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editingId ? 'Editar Aluno' : 'Novo Aluno'}>
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
            <label className="form-label">Turma</label>
            <input className="form-input" name="class" value={formData.class} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Série</label>
            <input className="form-input" name="grade" value={formData.grade} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Nascimento</label>
            <input type="date" className="form-input" name="birthDate" value={formData.birthDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Endereço</label>
            <input className="form-input" name="address" value={formData.address} onChange={handleChange} />
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

export default Students;
