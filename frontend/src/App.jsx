import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar    from './components/Navbar.jsx';
import Login     from './pages/Login.jsx';
import Register  from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TopicSelection from './pages/TopicSelection.jsx';
import Quiz      from './pages/Quiz.jsx';
import Result    from './pages/Result.jsx';
import { getUser, saveUser, clearAuth, api } from './utils/api.js';

function PrivateRoute({ children, user }) {
  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children, user }) {
  return !user ? children : <Navigate to="/dashboard" replace />;
}

export default function App() {
  const [user,    setUser]    = useState(getUser);
  const [loading, setLoading] = useState(!!getUser());

  // Verify token is still valid on mount
  useEffect(() => {
    if (!user) { setLoading(false); return; }
    api.getMe()
      .then((data) => { setUser(data.user); saveUser(data.user); })
      .catch(() => { clearAuth(); setUser(null); })
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    saveUser(userData);
  };

  const handleLogout = () => {
    clearAuth();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="loading-center">
        <div className="spinner" />
        <p>Loading AptiSmart…</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <main className="page-wrapper">
        <Routes>
          <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />

          <Route path="/login" element={
            <PublicRoute user={user}>
              <Login onLogin={handleLogin} />
            </PublicRoute>
          } />

          <Route path="/register" element={
            <PublicRoute user={user}>
              <Register onLogin={handleLogin} />
            </PublicRoute>
          } />

          <Route path="/dashboard" element={
            <PrivateRoute user={user}>
              <Dashboard user={user} />
            </PrivateRoute>
          } />

          <Route path="/topic-selection" element={
            <PrivateRoute user={user}>
              <TopicSelection />
            </PrivateRoute>
          } />

          <Route path="/quiz" element={
            <PrivateRoute user={user}>
              <Quiz user={user} />
            </PrivateRoute>
          } />

          <Route path="/result/:id" element={
            <PrivateRoute user={user}>
              <Result />
            </PrivateRoute>
          } />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}