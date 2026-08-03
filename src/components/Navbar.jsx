import React from 'react';
import { Sun, Moon, Bell, Heart, Home } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ 
  theme, 
  toggleTheme, 
  favoritesCount, 
  notificationCount, 
  onShowFavoritesOnly, 
  showFavoritesOnly,
  currentPage,
  setCurrentPage
}) {
  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => setCurrentPage('explorer')}>
        <Home size={24} />
        <span className="brand-text">AETHERIA <span className="brand-text-suffix">LUXURY HOMES</span></span>
      </div>

      <div className="nav-links">
        <button 
          className={`nav-link ${currentPage === 'explorer' ? 'active' : ''}`}
          onClick={() => setCurrentPage('explorer')}
        >
          Explorer
        </button>
        <button 
          className={`nav-link ${currentPage === 'analytics' ? 'active' : ''}`}
          onClick={() => setCurrentPage('analytics')}
        >
          Market Dashboard
        </button>
        <button 
          className={`nav-link ${currentPage === 'services' ? 'active' : ''}`}
          onClick={() => setCurrentPage('services')}
        >
          VIP Services
        </button>
        <button 
          className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
          onClick={() => setCurrentPage('contact')}
        >
          Inquiries
        </button>
      </div>

      <div className="nav-actions">
        <button 
          className="nav-action-btn"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button 
          className={`nav-action-btn ${showFavoritesOnly ? 'active' : ''}`}
          onClick={onShowFavoritesOnly}
          aria-label="View Favorites"
          style={showFavoritesOnly ? { borderColor: 'var(--accent)', background: 'rgba(99, 102, 241, 0.1)' } : {}}
        >
          <Heart size={18} fill={showFavoritesOnly ? 'var(--accent)' : 'none'} />
          {favoritesCount > 0 && (
            <span className="nav-badge">{favoritesCount}</span>
          )}
        </button>

        <button className="nav-action-btn" aria-label="Notifications">
          <Bell size={18} />
          {notificationCount > 0 && (
            <span className="nav-badge">{notificationCount}</span>
          )}
        </button>

        <div className="profile-area">
          <div className="profile-info">
            <span className="profile-name">Aryan Sharma</span>
            <span className="profile-role">V.I.P Investor</span>
          </div>
          <div className="profile-avatar">AS</div>
        </div>
      </div>
    </nav>
  );
}
