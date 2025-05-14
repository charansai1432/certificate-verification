import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context and components
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home.tsx';
import Login from './pages/Login';
import InternVerification from './pages/InternVerification';
import EmployeePortal from './pages/EmployeePortal';
import HRPortal from './pages/HRPortal';
import Dashboard from './pages/Dashboard';
import AddIntern from './pages/AddIntern';
import AddEmployee from './pages/AddEmployee';
import AddAdmin from './pages/AddAdmin';
import { Navigate } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              {/* Optional public or protected */}
              <Route path="/intern-verification" element={<InternVerification />} />
              <Route path="/employee-portal" element={<EmployeePortal />} />
              <Route path="/hr-portal" element={<HRPortal />} />

              {/* Protected Routes under /dashboard layout */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="add-intern" element={<AddIntern />} />
                <Route path="add-employee" element={<AddEmployee />} />
                <Route path="add-admin" element={<AddAdmin />} />
                <Route path="generate-certificate" element={<Navigate to="/certificate.html" replace />} />
              </Route>

              {/* Catch-all fallback route (optional) */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
