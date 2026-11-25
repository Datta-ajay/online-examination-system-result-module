import React, { useEffect, useState } from 'react';
import './App.css';
import { AppLayout } from './components/layout/AppLayout.jsx';
import { StudentLoginView } from './examination/StudentLoginView.jsx';
import { StudentExamHistoryView } from './examination/StudentExamHistoryView.jsx';
import { StudentResultsView } from './examination/StudentResultsView.jsx';
import initialQuestions from './data/questions.json';
import {
  isStorageAvailable, initializeStorage, getStudentSession, clearStudentSession
} from './utils/storage.js';

export default function App() {
  const [studentSession, setStudentSession] = useState(() => getStudentSession());
  const [activeNav, setActiveNav] = useState('student_results');

  useEffect(() => {
    if (isStorageAvailable()) initializeStorage(initialQuestions);
  }, []);

  const handleLogout = () => {
    clearStudentSession();
    setStudentSession(null);
  };

  const handleNavigate = (target) => {
    if (target === 'student_history' || target === 'student_results') {
      setActiveNav(target);
    } else {
      setActiveNav('student_results');
    }
  };

  if (!studentSession) {
    return (
      <div className="evaluation-login">
        <StudentLoginView onLoginSuccess={setStudentSession} />
      </div>
    );
  }

  return (
    <AppLayout
      activeRole="student"
      onRoleChange={() => {}}
      activeNav={activeNav}
      onNavChange={handleNavigate}
      studentSession={studentSession}
      onStudentLogout={handleLogout}
    >
      {activeNav === 'student_history'
        ? <StudentExamHistoryView onNavigate={handleNavigate} />
        : <StudentResultsView onNavigate={handleNavigate} />}
    </AppLayout>
  );
}
