import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/Topic.css';

export default function TopicSelection() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(2);
  const [questionCount, setQuestionCount] = useState(10);

  const topics = [
    { id: 'Profit & Loss', label: 'Profit & Loss', icon: '📈', description: 'Markup, discount, successive discounts, reverse problems' },
    { id: 'Percentages', label: 'Percentages', icon: '💯', description: 'Successive changes, percentage differences, complex applications' },
    { id: 'Time & Work', label: 'Time & Work', icon: '⏱️', description: 'Combined work, efficiency comparison, partial completion' },
    { id: 'Time & Distance', label: 'Time & Distance', icon: '🚗', description: 'Relative speed, trains, boats & streams' },
    { id: 'Ratio & Proportion', label: 'Ratio & Proportion', icon: '⚖️', description: 'Distribution, comparison, inverse ratios' },
    { id: 'Simple & Compound Interest', label: 'Interest', icon: '💰', description: 'SI vs CI, time to double, multi-year growth' },
    { id: 'Averages', label: 'Averages', icon: '📊', description: 'Missing values, weighted average, group averages' },
  ];

  const difficulties = [
    { value: 1, label: 'Easy', description: 'Single-step problems' },
    { value: 2, label: 'Medium', description: 'Multi-step problems' },
    { value: 3, label: 'Hard', description: 'Complex scenarios' },
  ];

  const handleTopicClick = (topicId) => {
    console.log('✅ Topic clicked:', topicId);
    setSelectedTopic(topicId);
    console.log('✅ State updated, selectedTopic should now be:', topicId);
  };

  const handleStart = () => {
    console.log('📋 Start button clicked');
    console.log('📋 Current selectedTopic:', selectedTopic);
    if (!selectedTopic) {
      alert('Please select a topic');
      return;
    }
    console.log('🚀 Starting quiz with:', { selectedTopic, selectedDifficulty, questionCount});
    navigate('/quiz', {
      state: {
        topic: selectedTopic,
        difficulty: selectedDifficulty,
        count: questionCount,
      },
    });
  };

  return (
    <div className="topic-selection">
      <div className="topic-container">
        <div className="topic-header">
          <h1>Choose Your Practice Topic</h1>
          <p>Select a topic and difficulty level to start your adaptive aptitude training</p>
        </div>

        {/* Topics */}
        <div className="topics-grid">
          {topics.map((topic) => (
            <button
              key={topic.id}
              className={`topic-card ${selectedTopic === topic.id ? 'selected' : ''}`}
              onClick={() => handleTopicClick(topic.id)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleTopicClick(topic.id);
                }
              }}
              type="button"
              aria-pressed={selectedTopic === topic.id}
              title={`Select ${topic.label}`}
            >
              <div className="topic-icon">{topic.icon}</div>
              <h3>{topic.label}</h3>
              <p>{topic.description}</p>
            </button>
          ))}
        </div>

        {/* Debug: Show selected topic */}
        {selectedTopic && (
          <div style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--clr-primary)', fontSize: '14px', fontWeight: '600' }}>
            ✓ Selected: {selectedTopic}
          </div>
        )}

        {/* Difficulty Selection */}
        {selectedTopic && (
          <>
            <div className="difficulty-section">
              <h2>Select Difficulty Level</h2>
              <div className="difficulty-grid">
                {difficulties.map((diff) => (
                  <button
                    key={diff.value}
                    className={`difficulty-option ${selectedDifficulty === diff.value ? 'selected' : ''}`}
                    onClick={() => {
                      console.log('Difficulty selected:', diff.value);
                      setSelectedDifficulty(diff.value);
                    }}
                    type="button"
                    aria-pressed={selectedDifficulty === diff.value}
                  >
                    <h4>{diff.label}</h4>
                    <p>{diff.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="question-count-section">
              <label htmlFor="question-count">Number of Questions:</label>
              <input
                id="question-count"
                type="number"
                min="1"
                max="20"
                value={questionCount}
                onChange={(e) => {
                  const value = Math.min(20, Math.max(1, parseInt(e.target.value) || 1));
                  console.log('Question count changed:', value);
                  setQuestionCount(value);
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="topic-actions">
              <button className="btn-start" onClick={handleStart}>
                🚀 Start Quiz
              </button>
              <button className="btn-cancel" onClick={() => navigate('/dashboard')}>
                ← Go Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
