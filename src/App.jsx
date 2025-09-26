import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedLayout from './components/ProtectedLayout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Students from './pages/Students.jsx';
import Teachers from './pages/Teachers.jsx';
import Classes from './pages/Classes.jsx';
import Reports from './pages/Reports.jsx';
import Settings from './pages/Settings.jsx';
import Disciplines from './pages/Disciplines.jsx';
import News from './pages/News.jsx';
import Gallery from './pages/Gallery.jsx';
import Documents from './pages/Documents.jsx';
import Account from './pages/Account.jsx';
import StudentLayout from './pages/student/StudentLayout.jsx';
import StudentGrades from './pages/student/Grades.jsx';
import StudentClassmates from './pages/student/Classmates.jsx';
import StudentSubjects from './pages/student/Subjects.jsx';
import StudentSchedule from './pages/student/Schedule.jsx';
import StudentAttendance from './pages/student/Attendance.jsx';
import StudentNotifications from './pages/student/Notifications.jsx';
import PublicLayout from './public/PublicLayout.jsx';
import PublicHome from './public/Home.jsx';
import PublicCourses from './public/Courses.jsx';
import PublicNews from './public/News.jsx';

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/site" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Private routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/disciplines" element={<Disciplines />} />
        <Route path="/news" element={<News />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="grades" replace />} />
          <Route path="grades" element={<StudentGrades />} />
          <Route path="classmates" element={<StudentClassmates />} />
          <Route path="subjects" element={<StudentSubjects />} />
          <Route path="schedule" element={<StudentSchedule />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="notifications" element={<StudentNotifications />} />
        </Route>
      </Route>

      {/* Public site routes */}
      <Route path="/site" element={<PublicLayout />}>
        <Route index element={<PublicHome />} />
        <Route path="cursos" element={<PublicCourses />} />
        <Route path="noticias" element={<PublicNews />} />
        <Route path="contato" element={<PublicHome />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
