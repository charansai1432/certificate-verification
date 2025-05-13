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

// For potential admin routes (currently commented out in original)
 // if exists
// import AdminDashboard from './pages/AdminDashboard';

import { Toaster } from 'react-hot-toast';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />

        {/* Navbar outside routes for consistent display */}
        <div className="min-h-screen bg-gray-50">
    
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {/* Define routes */}
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              {/* Intern Verification, Employee & HR portals (protected if needed) */}
              {/* Wrap in ProtectedRoute if these are secured */}
              <Route
                path="/intern-verification"
                element={
                  
                    <InternVerification />
                 
                }
              />
              <Route
                path="/employee-portal"
                element={
                  
                    <EmployeePortal />
                  
                }
              />
              <Route
                path="/hr-portal"
                element={
                  
                    <HRPortal />
                 
                }
              />

              {/* Add Intern & Employee */}
              <Route
                path="/add-intern"
                element={
                  
                    <AddIntern />
                 
                }
              />
              <Route
                path="/add-employee"
                element={
                  
                    <AddEmployee />
                  
                }
              />

              {/* Admin Add User (if needed) */}
              {/* <Route
                path="/admin-add-user"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminAddUserForm />
                  </ProtectedRoute>
                }
              /> */}

              
              {/* Dashboard nested inside Layout for main page structure */}
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={
  <ProtectedRoute>
    <Layout />
  </ProtectedRoute>
}>

                <Route index element={<Dashboard />} />
                <Route path="add-intern" element={<AddIntern />} />
                <Route path="add-employee" element={<AddEmployee />} />
              </Route>

              {/* Catch-all or fallback routes could go here */}
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;