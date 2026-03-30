import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api.js';
import './Result.css';

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResult();
  }, [id]);

  const fetchResult = async () => {
    try {
      setLoading(true);
      const response = await api.getResultDetail(id);
      setResult(response.result || response);
    } catch (err) {
      setError('Failed to load result');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading result…</p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="result-page">
        <div className="result-wrapper">
          <div className="error-message">{error || 'Result not found'}</div>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const percentage = result.score || 0;
  const isPassed = percentage >= 70;
  const performance = result.endLevel || (percentage >= 80 ? 'Advanced' : percentage >= 50 ? 'Intermediate' : 'Beginner');
  const timeInSeconds = result.timeTaken || 0;
  const timeInMinutes = Math.floor(timeInSeconds / 60);
  const remainingSeconds = timeInSeconds % 60;

  const getPerformanceBadgeClass = (level) => {
    switch (level) {
      case 'Advanced':
        return 'advanced';
      case 'Intermediate':
        return 'intermediate';
      case 'Beginner':
        return 'beginner';
      default:
        return '';
    }
  };

  return (
    <div className="result-page">
      <div className="result-wrapper">
        {/* Score Display */}
        <div className="score-section">
          <h1 className="score-title">📊 Your Results</h1>

          <div className={`score-circle ${isPassed ? 'passed' : 'failed'}`}>
            <span className="score-percentage">{percentage.toFixed(1)}%</span>
          </div>

          <h2 className={`result-message ${isPassed ? 'passed' : 'failed'}`}>
            {isPassed ? '🎉 Congratulations!' : '📚 Keep Practicing!'}
          </h2>
          <p className="result-submessage">
            {isPassed
              ? 'You performed well on this quiz!'
              : 'Review the explanations and try again to improve your score.'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-section">
          <div className="stat-box">
            <div className="stat-box-label">Correct Answers</div>
            <div className="stat-box-value">{result.correctAnswers || 0}</div>
            <div className="stat-box-unit">out of {result.totalQuestions} questions</div>
          </div>

          <div className="stat-box accuracy">
            <div className="stat-box-label">Accuracy</div>
            <div className="stat-box-value">{percentage.toFixed(1)}%</div>
            <div className="stat-box-unit">overall performance</div>
          </div>

          <div className="stat-box">
            <div className="stat-box-label">Time Taken</div>
            <div className="stat-box-value">{timeInMinutes}:{remainingSeconds.toString().padStart(2, '0')}</div>
            <div className="stat-box-unit">minutes</div>
          </div>

          <div className="stat-box level">
            <div className="stat-box-label">Performance Level</div>
            <div className="stat-box-value">{performance}</div>
            <div className="stat-box-unit">
              <span className={`performance-badge ${getPerformanceBadgeClass(performance)}`}>
                {performance}
              </span>
            </div>
          </div>
        </div>

        {/* Question Review */}
        {result.questions && result.questions.length > 0 && (
          <div className="review-section">
            <h3>📝 Question Review</h3>
            {result.questions.map((q, idx) => (
              <div key={idx} className={`question-review ${q.isCorrect ? 'correct' : 'incorrect'}`}>
                <h4>{idx + 1}. {q.questionText}</h4>
                <p className="qr-text">
                  <strong>Difficulty:</strong> {q.difficulty === 1 ? 'Easy' : q.difficulty === 2 ? 'Medium' : 'Hard'}
                </p>
                <p className="qr-your-answer">
                  <strong>Your Answer:</strong> {q.userAnswer || 'Not answered'}
                </p>
                {q.correctAnswer && (
                  <p className="qr-correct-answer">
                    <strong>Correct Answer:</strong> {q.correctAnswer}
                  </p>
                )}
                {q.isCorrect && (
                  <p style={{ color: 'var(--clr-success)', fontSize: '13px', fontWeight: '600', marginTop: '8px' }}>
                    ✓ Correct!
                  </p>
                )}
                {q.explanation && (
                  <div className="qr-explanation">
                    <p><strong>Explanation:</strong></p>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="result-actions">
          <button className="btn-home" onClick={() => navigate('/dashboard')}>
            📊 Back to Dashboard
          </button>
          <button className="btn-retry" onClick={() => navigate('/topic-selection')}>
            🔄 Take Another Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
