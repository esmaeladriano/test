import React, { createContext, useContext, useReducer, useEffect } from 'react';

const SchoolContext = createContext();

// Dados iniciais de exemplo
const initialState = {
  students: [
    {
      id: 1,
      name: 'Ana Silva',
      email: 'ana.silva@email.com',
      phone: '(11) 99999-1111',
      class: 'Turma A',
      grade: '9º Ano',
      birthDate: '2008-05-15',
      address: 'Rua das Flores, 123'
    },
    {
      id: 2,
      name: 'João Santos',
      email: 'joao.santos@email.com',
      phone: '(11) 99999-2222',
      class: 'Turma B',
      grade: '8º Ano',
      birthDate: '2009-03-22',
      address: 'Av. Principal, 456'
    },
    {
      id: 3,
      name: 'Maria Oliveira',
      email: 'maria.oliveira@email.com',
      phone: '(11) 99999-3333',
      class: 'Turma A',
      grade: '9º Ano',
      birthDate: '2008-08-10',
      address: 'Rua do Sol, 789'
    }
  ],
  teachers: [
    {
      id: 1,
      name: 'Prof. Carlos Mendes',
      email: 'carlos.mendes@escola.com',
      phone: '(11) 88888-1111',
      subject: 'Matemática',
      classes: ['Turma A', 'Turma B'],
      hireDate: '2020-02-01'
    },
    {
      id: 2,
      name: 'Prof. Lucia Ferreira',
      email: 'lucia.ferreira@escola.com',
      phone: '(11) 88888-2222',
      subject: 'Português',
      classes: ['Turma A', 'Turma C'],
      hireDate: '2019-08-15'
    }
  ],
  classes: [
    {
      id: 1,
      name: 'Turma A',
      grade: '9º Ano',
      teacher: 'Prof. Carlos Mendes',
      students: 25,
      schedule: 'Manhã',
      room: 'Sala 101'
    },
    {
      id: 2,
      name: 'Turma B',
      grade: '8º Ano',
      teacher: 'Prof. Lucia Ferreira',
      students: 23,
      schedule: 'Tarde',
      room: 'Sala 102'
    }
  ]
};

// Reducer para gerenciar as ações
function schoolReducer(state, action) {
  switch (action.type) {
    case 'ADD_STUDENT':
      return {
        ...state,
        students: [...state.students, { ...action.payload, id: Date.now() }]
      };
    
    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id ? action.payload : student
        )
      };
    
    case 'DELETE_STUDENT':
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.payload)
      };
    
    case 'ADD_TEACHER':
      return {
        ...state,
        teachers: [...state.teachers, { ...action.payload, id: Date.now() }]
      };
    
    case 'UPDATE_TEACHER':
      return {
        ...state,
        teachers: state.teachers.map(teacher =>
          teacher.id === action.payload.id ? action.payload : teacher
        )
      };
    
    case 'DELETE_TEACHER':
      return {
        ...state,
        teachers: state.teachers.filter(teacher => teacher.id !== action.payload)
      };
    
    case 'ADD_CLASS':
      return {
        ...state,
        classes: [...state.classes, { ...action.payload, id: Date.now() }]
      };
    
    case 'UPDATE_CLASS':
      return {
        ...state,
        classes: state.classes.map(cls =>
          cls.id === action.payload.id ? action.payload : cls
        )
      };
    
    case 'DELETE_CLASS':
      return {
        ...state,
        classes: state.classes.filter(cls => cls.id !== action.payload)
      };
    
    case 'LOAD_DATA':
      return action.payload;
    
    default:
      return state;
  }
}

export function SchoolProvider({ children }) {
  const [state, dispatch] = useReducer(schoolReducer, initialState);

  // Salvar dados no localStorage
  useEffect(() => {
    localStorage.setItem('schoolData', JSON.stringify(state));
  }, [state]);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedData = localStorage.getItem('schoolData');
    if (savedData) {
      dispatch({ type: 'LOAD_DATA', payload: JSON.parse(savedData) });
    }
  }, []);

  // Funções auxiliares
  const addStudent = (student) => {
    dispatch({ type: 'ADD_STUDENT', payload: student });
  };

  const updateStudent = (student) => {
    dispatch({ type: 'UPDATE_STUDENT', payload: student });
  };

  const deleteStudent = (id) => {
    dispatch({ type: 'DELETE_STUDENT', payload: id });
  };

  const addTeacher = (teacher) => {
    dispatch({ type: 'ADD_TEACHER', payload: teacher });
  };

  const updateTeacher = (teacher) => {
    dispatch({ type: 'UPDATE_TEACHER', payload: teacher });
  };

  const deleteTeacher = (id) => {
    dispatch({ type: 'DELETE_TEACHER', payload: id });
  };

  const addClass = (cls) => {
    dispatch({ type: 'ADD_CLASS', payload: cls });
  };

  const updateClass = (cls) => {
    dispatch({ type: 'UPDATE_CLASS', payload: cls });
  };

  const deleteClass = (id) => {
    dispatch({ type: 'DELETE_CLASS', payload: id });
  };

  const value = {
    ...state,
    addStudent,
    updateStudent,
    deleteStudent,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    addClass,
    updateClass,
    deleteClass
  };

  return (
    <SchoolContext.Provider value={value}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool deve ser usado dentro de um SchoolProvider');
  }
  return context;
}
