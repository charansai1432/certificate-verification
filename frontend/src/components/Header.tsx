import React, { useState } from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you could add any logout logic like clearing tokens/state
    navigate('/');
    setShowProfileMenu(false);
  };

  return (
    <header className="header">
      <div className="page-title">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="header-actions">
        <button className="header-btn" aria-label="Notifications">
          <Bell size={20} />
        </button>
        <div className="user-profile-container">
          <button 
            className="user-profile"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-expanded={showProfileMenu}
            aria-haspopup="true"
          >
            <div className="avatar">
              <User size={20} />
            </div>
            <div className="user-info">
              <span className="user-name">Admin</span>
              <span className="user-role">Administrator</span>
            </div>
          </button>
          
          {showProfileMenu && (
            <div className="profile-dropdown">
              <button className="dropdown-item" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;