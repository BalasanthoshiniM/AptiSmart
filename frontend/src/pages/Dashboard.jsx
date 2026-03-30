import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api.js';
import './Dashboard.css';

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [historyRes, statsRes] = await Promise.all([
        api.getHistory(1, 10),
        api.getStats(),
      ]);
      setResults(historyRes.results || []);
      setStats(statsRes.stats || null);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPerformanceLevel = (accuracy) => {
    if (accuracy >= 80) return 'Advanced';
    if (accuracy >= 50) return 'Intermediate';
    return 'Beginner';
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Advanced':
        return '#a78bfa';
      case 'Intermediate':
        return '#fbbf24';
      case 'Beginner':
        return '#f87171';
      default:
        return '#4f9cf9';
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading dashboard…</p>
      </div>
    );
  }

  const accuracy = stats?.overallAccuracy || 0;
  const level = user?.currentLevel || 'Intermediate';

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name}! 👋</h1>

      {error && <div className="error-message">{error}</div>}

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Attempts</h3>
          <div className="value">{user?.totalAttempts || 0}</div>
          <div className="unit">quizzes completed</div>
        </div>
        <div className="stat-card">
          <h3>Overall Accuracy</h3>
          <div className="value">{accuracy.toFixed(1)}%</div>
          <div className="unit">average score</div>
        </div>
        <div className="stat-card">
          <h3>Current Level</h3>
          <div className="value">{level}</div>
          <div className="unit">
            <span className="level-badge" style={{ borderColor: getLevelColor(level), color: getLevelColor(level) }}>
              {level}
            </span>
          </div>
        </div>
        <div className="stat-card">
          <h3>Total Questions</h3>
          <div className="value">{user?.totalQuestions || 0}</div>
          <div className="unit">questions attempted</div>
        </div>
      </div>

      {/* Action Section */}
      <div className="dashboard-section">
        <div className="action-buttons">
          <button className="btn btn-primary" onClick={() => navigate('/topic-selection')}>
            📊 Start New Quiz
          </button>
          <button className="btn btn-secondary" onClick={fetchData}>
            🔄 Refresh Stats
          </button>
        </div>
      </div>

      {/* Previous Results */}
      <div className="dashboard-section">
        <h2>Recent Attempts</h2>
        {results.length > 0 ? (
          <div className="results-grid">
            {results.map((result) => (
              <div key={result._id} className="result-item">
                <h3>📖 {result.topic}</h3>
                <div className="result-item-meta">
                  <span>{new Date(result.createdAt).toLocaleDateString()}</span>
                  <span>{result.totalQuestions} questions</span>
                </div>
                <div className="result-score">{result.score.toFixed(1)}%</div>
                <div className="result-accuracy">
                  ✓ {result.correctAnswers} correct out of {result.totalQuestions}
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(`/result/${result._id}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p>No quiz attempts yet. Start practicing to see your results here!</p>
            <button className="btn btn-primary" onClick={() => navigate('/topic-selection')}>
              Start Your First Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
