const express = require('express');
const { protect } = require('../middleware/auth');
const { 
  generateAdvancedQuestions, 
  generateAdvancedQuestion, 
  getAvailableTopics 
} = require('../utils/advancedQuestionGenerator');

const router = express.Router();

// GET /api/quiz/generate?topic=Profit+%26+Loss&count=10&difficulty=2
router.get('/generate', protect, (req, res) => {
  try {
    const topic      = req.query.topic      || 'Profit & Loss';
    const count      = Math.min(parseInt(req.query.count) || 10, 20);
    const difficulty = parseInt(req.query.difficulty) || 2;

    console.log(`[Quiz] Generating quiz for: topic="${topic}", count=${count}, difficulty=${difficulty}`);

    const validTopics = getAvailableTopics().map(t => t.name);
    console.log(`[Quiz] Valid topics available: ${validTopics.join(', ')}`);
    
    if (!validTopics.includes(topic)) {
      return res.status(400).json({ 
        success: false, 
        message: `Invalid topic. Choose from: ${validTopics.join(', ')}`,
        availableTopics: validTopics
      });
    }

    const questions = generateAdvancedQuestions(count, topic, difficulty);
    console.log(`[Quiz] Successfully generated ${questions.length} questions`);

    res.json({
      success:    true,
      topic,
      count:      questions.length,
      difficulty: questions[0]?.difficultyLabel || 'Medium',
      questions:  questions
    });
  } catch (err) {
    console.error('❌ Quiz generate error:', err.message);
    console.error('Stack:', err.stack);
    res.status(500).json({ success: false, message: 'Failed to generate quiz.', error: err.message });
  }
});

// POST /api/quiz/generate-adaptive  — generates one question at a time for adaptive mode
router.post('/generate-adaptive', protect, (req, res) => {
  try {
    const { topic = 'Profit & Loss', difficulty = 2 } = req.body;
    const clampedDiff = Math.max(1, Math.min(3, difficulty));
    const question = generateAdvancedQuestion(topic, clampedDiff);

    res.json({
      success: true,
      question: question,
      difficulty: question.difficultyLabel
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to generate question.' });
  }
});

// POST /api/quiz/check-answer
router.post('/check-answer', protect, (req, res) => {
  try {
    const { correctAnswer, userAnswer, currentDifficulty } = req.body;
    const isCorrect = String(userAnswer).trim() === String(correctAnswer).trim();
    
    // Adaptive difficulty adjustment
    let nextDiff = currentDifficulty;
    if (isCorrect && currentDifficulty < 3) {
      nextDiff = currentDifficulty + 1;
    } else if (!isCorrect && currentDifficulty > 1) {
      nextDiff = currentDifficulty - 1;
    }
    
    const diffLabels = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };

    res.json({
      success: true,
      isCorrect,
      nextDifficulty: nextDiff,
      nextDifficultyLabel: diffLabels[nextDiff]
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to check answer.' });
  }
});

// GET /api/quiz/topics
router.get('/topics', protect, (_req, res) => {
  try {
    const topics = getAvailableTopics().map(t => ({
      id: t.name,
      label: t.name,
      icon: '📊',
      description: t.description,
      templates: t.templates
    }));

    res.json({
      success: true,
      topics: topics,
      difficulties: [
        { value: 1, label: 'Easy', description: 'Single-step, fundamental concepts' },
        { value: 2, label: 'Medium', description: 'Multi-step, company-level aptitude problems' },
        { value: 3, label: 'Hard', description: 'Complex scenarios, advanced multi-concept problems' }
      ]
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch topics.' });
  }
});

module.exports = router;