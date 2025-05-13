import React, { useEffect, useState } from 'react';
import { Users, UserPlus, Briefcase, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => (
  <div className="stats-card" style={{ borderTop: `4px solid ${color}` }}>
    <div className="stats-icon" style={{ backgroundColor: `${color}10`, color }}>
      {icon}
    </div>
    <div className="stats-info">
      <h3>{title}</h3>
      <p className="stats-value">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalInterns: 0,
    departments: 0
  });
  
  useEffect(() => {
    // Fetch stats from the API
    const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/stats`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Use default data for demonstration
        setStats({
          totalEmployees: 42,
          totalInterns: 15,
          departments: 3
        });
      }
    };
    
    fetchStats();
  }, []);
  
  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h2>Welcome to GreatHire Admin Dashboard</h2>
        <p>Manage your employees and interns efficiently</p>
      </div>
      
      <div className="stats-grid">
        <StatsCard 
          title="Total Employees" 
          value={stats.totalEmployees} 
          icon={<Briefcase size={24} />} 
          color="#2563eb" 
        />
        <StatsCard 
          title="Total Interns" 
          value={stats.totalInterns} 
          icon={<Users size={24} />} 
          color="#0ea5e9" 
        />
        <StatsCard 
          title="Departments" 
          value= {stats.departments}
          icon={<BarChart size={24} />} 
          color="#06b6d4" 
        />
      </div>
      
      <div className="action-cards">
        <Link to="/add-intern" className="action-card">
          <div className="action-icon">
            <UserPlus size={24} />
          </div>
          <div className="action-info">
            <h3>Add New Intern</h3>
            <p>Register a new intern to the system</p>
          </div>
        </Link>
        
        <Link to="/add-employee" className="action-card">
          <div className="action-icon">
            <Briefcase size={24} />
          </div>
          <div className="action-info">
            <h3>Add New Employee</h3>
            <p>Register a new employee to the system</p>
          </div>
        </Link>
        <Link to="/add-admin" className="action-card">
  <div className="action-icon">
    <UserPlus size={24} />
  </div>
  <div className="action-info">
    <h3>Add New Admin</h3>
    <p>Register a new admin to the system</p>
  </div>
</Link>

      </div>
    </div>
  );
};

export default Dashboard;