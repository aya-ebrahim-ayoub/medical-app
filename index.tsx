
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { DoctorList } from './pages/DoctorList';
import { BookingPage } from './pages/BookingPage';
import { PatientDashboard } from './pages/PatientDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { User } from './types';
import { api } from './services/api';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAuth = localStorage.getItem('mc_auth');
    if (savedAuth) {
      setUser(JSON.parse(savedAuth));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/book/:id" element={<BookingPage user={user} />} />
          
          <Route 
            path="/patient-dashboard" 
            element={user?.role === 'PATIENT' ? <PatientDashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin-dashboard" 
            element={user?.role === 'ADMIN' ? <AdminDashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/doctor-dashboard" 
            element={user?.role === 'DOCTOR' ? <DoctorDashboard user={user} /> : <Navigate to="/login" />} 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
