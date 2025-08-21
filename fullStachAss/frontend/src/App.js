import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import SubmitExpenseClaim from './components/ExpenseForm';
import MyClaims from './components/MyClaims';
import Approvals from './components/Approvals';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboards */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Claims */}
        <Route path="/submit" element={<SubmitExpenseClaim />} />
        <Route path="/claims" element={<MyClaims />} />
        <Route path="/approvals" element={<Approvals />} />

        {/* Default route → redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />
       
      </Routes>
    </Router>
  );
}

export default App;
