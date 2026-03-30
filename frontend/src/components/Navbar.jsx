import { Link, useNavigate, useLocation } from 'react-router-dom';
import { clearAuth } from '../utils/api.js';
import './Navbar.css';

export default function Navbar({ user, onLogout }) {
  const navigate  = useNavigate();
  const location  = useLocation();

  const handleLogout = () => {
    clearAuth();
    onLogout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        {/* Brand */}
        <Link to="/dashboard" className="navbar-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-text">AptiSmart</span>
        </Link>

        {/* Nav links */}
        {user && (
          <ul className="navbar-links">
            <li>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/quiz" className={`nav-link ${isActive('/quiz') ? 'active' : ''}`}>
                Start Quiz
              </Link>
            </li>
          </ul>
        )}

        {/* User section */}
        {user ? (
          <div className="navbar-user">
            <span className="user-greeting">
              <span className="level-dot" data-level={user.currentLevel?.toLowerCase()} />
              {user.name}
            </span>
            <button onClick={handleLogout} className="btn btn-ghost btn-sm">
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar-user">
            <Link to="/login"    className="btn btn-ghost btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}