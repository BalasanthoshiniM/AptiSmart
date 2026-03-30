import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../utils/api.js';
import './Quiz.css';

export default function Quiz({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { topic = 'Mixed', difficulty = 2, count = 10 } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentDifficulty, setCurrentDifficulty] = useState(difficulty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await api.generateQuiz(topic, count, difficulty);
      console.log('[FetchQuestions] Received response:', response);
      console.log('[FetchQuestions] Questions sample:', response.questions?.[0]);
      setQuestions(response.questions || []);
      setAnswers(new Array(response.questions?.length || 0).fill(null));
    } catch (err) {
      setError('Failed to load questions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIdx] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (currentQuestionIdx < questions.length - 1) {
      // Check if answer is correct and update difficulty
      if (answers[currentQuestionIdx] !== null) {
        const question = questions[currentQuestionIdx];
        const selectedOption = question.options[answers[currentQuestionIdx]];
        const isCorrect = String(selectedOption).trim() === String(question.correctAnswer).trim();

        // Adjust difficulty
        if (isCorrect && currentDifficulty < 3) {
          setCurrentDifficulty(currentDifficulty + 1);
        } else if (!isCorrect && currentDifficulty > 1) {
          setCurrentDifficulty(currentDifficulty - 1);
        }
      }

      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  const handleSubmit = async () => {
    if (answers[currentQuestionIdx] === null) {
      alert('Please answer the current question before submitting');
      return;
    }

    setSubmitting(true);
    try {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000); // in seconds

      const resultData = {
        topic,
        questions: answers.map((ansIdx, idx) => {
          const q = questions[idx];
          const userAns = ansIdx !== null ? q?.options[ansIdx] : null;
          const correctAns = q?.correctAnswer;
          const isCorrect = userAns !== null && String(userAns).trim() === String(correctAns).trim();
          
          console.log(`[Q${idx+1}] userAns="${userAns}" (index ${ansIdx}), correctAns="${correctAns}", isCorrect=${isCorrect}`);
          console.log(`      options: ${JSON.stringify(q?.options)}`);
          
          return {
            questionText: q?.text,
            text: q?.text,
            topic: q?.topic || topic,
            difficulty: q?.difficulty,
            correctAnswer: correctAns,
            userAnswer: userAns,
            options: q?.options,
            isCorrect,
            explanation: q?.explanation || '',
          };
        }),
        timeTaken,
      };

      console.log('📤 Submitting quiz with data:', resultData);
      const response = await api.submitResult(resultData);
      console.log('✅ Quiz submitted successfully:', response);
      navigate(`/result/${response.result._id}`);
    } catch (err) {
      console.error('❌ Submit error:', err.message);
      setError('Failed to submit quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading quiz…</p>
      </div>
    );
  }

  if (error && !questions.length) {
    return (
      <div className="quiz-page">
        <div className="error-message">{error}</div>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const question = questions[currentQuestionIdx];
  const progress = ((currentQuestionIdx + 1) / questions.length) * 100;
  const isAnswered = answers[currentQuestionIdx] !== null;

  return (
    <div className="quiz-page">
      <div className="quiz-wrapper">
        {/* Header */}
        <div className="quiz-header">
          <div className="quiz-header-top">
            <div className="quiz-info">
              <div className="quiz-info-item">
                <div className="quiz-info-label">Topic</div>
                <div className="quiz-info-value">📖 {topic}</div>
              </div>
              <div className="quiz-info-item">
                <div className="quiz-info-label">Difficulty</div>
                <div className="quiz-info-value">
                  {currentDifficulty === 1 ? '🟢 Easy' : currentDifficulty === 2 ? '🟡 Medium' : '🔴 Hard'}
                </div>
              </div>
            </div>
            <div className="quiz-timer">⏱️ {formatTime(timeElapsed)}</div>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--clr-text-2)' }}>
            Question {currentQuestionIdx + 1} of {questions.length}
          </p>
        </div>

        {/* Question Card */}
        <div className="question-card">
          <div className="question-number">Question {currentQuestionIdx + 1}</div>
          <div className="question-text">{question?.text}</div>

          {/* Answer Options */}
          <div className="options-wrapper">
            {question?.options?.map((option, idx) => (
              <label key={idx} className="option-label">
                <input
                  type="radio"
                  name="answer"
                  value={idx}
                  checked={answers[currentQuestionIdx] === idx}
                  onChange={() => handleAnswerSelect(idx)}
                />
                <span className="option-button">
                  {option}
                </span>
              </label>
            ))}
          </div>



          {/* Quiz Controls */}
          <div className="quiz-controls">
            <button
              className="btn-prev"
              onClick={handlePrevious}
              disabled={currentQuestionIdx === 0}
            >
              ← Previous
            </button>

            {currentQuestionIdx === questions.length - 1 ? (
              <button
                className="btn-submit"
                onClick={handleSubmit}
                disabled={!isAnswered || submitting}
              >
                {submitting ? 'Submitting…' : '✓ Submit Quiz'}
              </button>
            ) : (
              <button
                className="btn-next"
                onClick={handleNext}
                disabled={!isAnswered}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
